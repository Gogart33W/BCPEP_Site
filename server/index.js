import express from 'express';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { db, getSetting, setSetting } from './db.js';

const PORT = Number(process.env.PORT || 3001);
const UPLOADS = path.resolve('storage/uploads');
const DIST = path.resolve('dist');

const app = express();
app.use(express.json({ limit: '5mb' }));

// ---------- helpers ----------
const parseJson = (row, ...keys) => {
  if (!row) return row;
  for (const k of keys) row[k] = JSON.parse(row[k] || '[]');
  return row;
};

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const test = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(test, Buffer.from(hash, 'hex'));
}

// Перший адміністратор створюється зі змінних середовища
if (!db.prepare('SELECT 1 FROM admins LIMIT 1').get()) {
  const email = process.env.ADMIN_EMAIL || 'admin@bcpep.org.ua';
  const password = process.env.ADMIN_PASSWORD || 'admin';
  db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(email, hashPassword(password));
  console.log(`Створено адміністратора ${email}. Змініть пароль через ADMIN_PASSWORD.`);
}

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '');
  const session = token && db.prepare("SELECT email FROM sessions WHERE token = ? AND expires_at > datetime('now')").get(token);
  if (!session) return res.status(401).json({ error: 'Потрібна авторизація' });
  req.admin = session.email;
  next();
}

const slugify = (s) => s.toLowerCase()
  .replace(/[ґ]/g, 'g').replace(/[є]/g, 'ye').replace(/[ї]/g, 'yi').replace(/[і]/g, 'i').replace(/[й]/g, 'j')
  .replace(/[а-яё]/g, (c) => ({
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
    о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'cz', ч: 'ch', ш: 'sh', щ: 'shh',
    ь: '', ю: 'yu', я: 'ya', ъ: '', ы: 'y', э: 'e', ё: 'yo'
  }[c] ?? ''))
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120) || `post-${Date.now()}`;

// ---------- public API ----------
const api = express.Router();

api.get('/menu', (req, res) => res.json(getSetting('menu', [])));
api.get('/home', (req, res) => res.json(getSetting('home', {})));

api.get('/pages', (req, res) => {
  res.json(db.prepare('SELECT slug, title, updated_at FROM pages ORDER BY slug').all());
});

api.get('/pages/*slug', (req, res) => {
  const slug = [].concat(req.params.slug).join('/');
  const page = parseJson(db.prepare('SELECT * FROM pages WHERE slug = ?').get(slug), 'documents');
  if (!page) return res.status(404).json({ error: 'Сторінку не знайдено' });
  res.json(page);
});

api.get('/news', (req, res) => {
  const per = Math.min(Number(req.query.per) || 12, 50);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const where = [];
  const args = [];
  if (req.query.category) { where.push('categories LIKE ?'); args.push(`%"${req.query.category}"%`); }
  if (req.query.q) { where.push('(title LIKE ? OR content LIKE ?)'); args.push(`%${req.query.q}%`, `%${req.query.q}%`); }
  const w = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = db.prepare(`SELECT COUNT(*) AS c FROM news ${w}`).get(...args).c;
  const items = db.prepare(`SELECT id, slug, title, image, categories, date FROM news ${w} ORDER BY date DESC LIMIT ? OFFSET ?`)
    .all(...args, per, (page - 1) * per).map((r) => parseJson(r, 'categories'));
  res.json({ items, total, page, pages: Math.ceil(total / per) });
});

api.get('/news/categories', (req, res) => {
  const counts = {};
  for (const r of db.prepare('SELECT categories FROM news').all()) {
    for (const c of JSON.parse(r.categories)) counts[c] = (counts[c] || 0) + 1;
  }
  res.json(Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));
});

api.get('/news/*slug', (req, res) => {
  const slug = [].concat(req.params.slug).join('/');
  const item = parseJson(db.prepare('SELECT * FROM news WHERE slug = ?').get(slug), 'categories', 'documents');
  if (!item) return res.status(404).json({ error: 'Новину не знайдено' });
  res.json(item);
});

// Визначає, чим є шлях: сторінкою чи новиною (у WordPress вони в одному просторі URL)
api.get('/resolve/*slug', (req, res) => {
  const slug = [].concat(req.params.slug).join('/');
  if (db.prepare('SELECT 1 FROM pages WHERE slug = ?').get(slug)) return res.json({ type: 'page', slug });
  if (db.prepare('SELECT 1 FROM news WHERE slug = ?').get(slug)) return res.json({ type: 'news', slug });
  res.status(404).json({ error: 'Не знайдено' });
});

api.get('/search', (req, res) => {
  const q = String(req.query.q || '').trim();
  if (q.length < 2) return res.json({ pages: [], news: [] });
  const like = `%${q}%`;
  res.json({
    pages: db.prepare('SELECT slug, title FROM pages WHERE title LIKE ? OR content LIKE ? LIMIT 20').all(like, like),
    news: db.prepare('SELECT slug, title, date FROM news WHERE title LIKE ? OR content LIKE ? ORDER BY date DESC LIMIT 20').all(like, like)
  });
});

api.get('/documents', (req, res) => {
  const docs = [];
  for (const p of db.prepare('SELECT slug, title, documents FROM pages').all()) {
    for (const d of JSON.parse(p.documents)) docs.push({ ...d, source: p.title, sourceSlug: p.slug });
  }
  res.json(docs);
});

// Розклад і заміни — дані вносить адміністрація
api.get('/groups', (req, res) => res.json(db.prepare('SELECT * FROM groups ORDER BY name').all()));

api.get('/schedule/:group', (req, res) => {
  const group = db.prepare('SELECT * FROM groups WHERE name = ?').get(req.params.group);
  if (!group) return res.status(404).json({ error: 'Групу не знайдено' });
  const lessons = db.prepare('SELECT id, weekday, pair, subject, teacher, room FROM lessons WHERE group_name = ? ORDER BY weekday, pair').all(group.name);
  res.json({ group, lessons, bells: getSetting('bells', null) });
});

api.get('/substitutions', (req, res) => {
  const where = [];
  const args = [];
  if (req.query.group) { where.push('group_name = ?'); args.push(req.query.group); }
  if (req.query.date) { where.push('date = ?'); args.push(req.query.date); }
  else { where.push("date >= date('now', '-1 day')"); }
  res.json(db.prepare(`SELECT * FROM substitutions WHERE ${where.join(' AND ')} ORDER BY date, group_name, pair`).all(...args));
});

api.get('/settings/schedule', (req, res) => {
  res.json({ bells: getSetting('bells', null), scheduleUrl: getSetting('scheduleUrl', null), substitutionsUrl: getSetting('substitutionsUrl', null) });
});

api.get('/notice', (req, res) => {
  const notice = getSetting('notice', {
    enabled: false,
    type: 'info',
    badge: 'Оголошення',
    title: '',
    text: '',
    dateInfo: '',
    actionText: '',
    actionUrl: ''
  });
  res.json(notice);
});

// ---------- auth ----------
api.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const admin = email && db.prepare('SELECT * FROM admins WHERE email = ?').get(String(email).toLowerCase());
  if (!admin || !verifyPassword(String(password || ''), admin.password_hash)) {
    return res.status(401).json({ error: 'Невірна пошта або пароль' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  db.prepare("INSERT INTO sessions (token, email, expires_at) VALUES (?, ?, datetime('now', '+7 days'))").run(token, admin.email);
  res.json({ token, email: admin.email });
});

api.post('/auth/logout', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(req.headers.authorization.replace(/^Bearer /, ''));
  res.json({ ok: true });
});

api.get('/auth/me', requireAdmin, (req, res) => res.json({ email: req.admin }));

// ---------- admin API ----------
const admin = express.Router();
admin.use(requireAdmin);

admin.post('/news', (req, res) => {
  const { title, content = '', image = null, categories = [], date } = req.body || {};
  if (!title) return res.status(400).json({ error: 'Вкажіть заголовок' });
  let slug = slugify(title);
  if (db.prepare('SELECT 1 FROM news WHERE slug = ?').get(slug) || db.prepare('SELECT 1 FROM pages WHERE slug = ?').get(slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  const info = db.prepare('INSERT INTO news (slug, title, content, image, categories, date) VALUES (?, ?, ?, ?, ?, ?)')
    .run(slug, title, content, image, JSON.stringify(categories), date || new Date().toISOString());
  res.status(201).json({ id: Number(info.lastInsertRowid), slug });
});

admin.put('/news/:id', (req, res) => {
  const { title, content, image, categories, date } = req.body || {};
  const row = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Новину не знайдено' });
  db.prepare('UPDATE news SET title = ?, content = ?, image = ?, categories = ?, date = ? WHERE id = ?').run(
    title ?? row.title, content ?? row.content, image ?? row.image,
    categories ? JSON.stringify(categories) : row.categories, date ?? row.date, row.id
  );
  res.json({ ok: true });
});

admin.delete('/news/:id', (req, res) => {
  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

admin.get('/news/:id', (req, res) => {
  const row = parseJson(db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id), 'categories', 'documents');
  if (!row) return res.status(404).json({ error: 'Новину не знайдено' });
  res.json(row);
});

admin.put('/pages/*slug', (req, res) => {
  const slug = [].concat(req.params.slug).join('/');
  const { title, content, documents } = req.body || {};
  const row = db.prepare('SELECT * FROM pages WHERE slug = ?').get(slug);
  if (!row) return res.status(404).json({ error: 'Сторінку не знайдено' });
  db.prepare("UPDATE pages SET title = ?, content = ?, documents = ?, updated_at = datetime('now') WHERE slug = ?").run(
    title ?? row.title, content ?? row.content, documents ? JSON.stringify(documents) : row.documents, slug
  );
  res.json({ ok: true });
});

admin.post('/groups', (req, res) => {
  const { name, specialty = null, course = null } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Вкажіть назву групи' });
  try {
    db.prepare('INSERT INTO groups (name, specialty, course) VALUES (?, ?, ?)').run(name.trim(), specialty, course);
  } catch {
    return res.status(409).json({ error: 'Така група вже існує' });
  }
  res.status(201).json({ ok: true });
});

admin.delete('/groups/:name', (req, res) => {
  db.prepare('DELETE FROM groups WHERE name = ?').run(req.params.name);
  res.json({ ok: true });
});

// Повна заміна тижневого розкладу групи
admin.put('/schedule/:group', (req, res) => {
  const group = db.prepare('SELECT name FROM groups WHERE name = ?').get(req.params.group);
  if (!group) return res.status(404).json({ error: 'Групу не знайдено' });
  const lessons = Array.isArray(req.body?.lessons) ? req.body.lessons : [];
  const insert = db.prepare('INSERT INTO lessons (group_name, weekday, pair, subject, teacher, room) VALUES (?, ?, ?, ?, ?, ?)');
  db.exec('BEGIN');
  try {
    db.prepare('DELETE FROM lessons WHERE group_name = ?').run(group.name);
    for (const l of lessons) {
      if (!l.subject) continue;
      insert.run(group.name, Number(l.weekday), Number(l.pair), l.subject, l.teacher || null, l.room || null);
    }
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    return res.status(400).json({ error: e.message });
  }
  res.json({ ok: true });
});

admin.post('/substitutions', (req, res) => {
  const items = Array.isArray(req.body) ? req.body : [req.body];
  const insert = db.prepare('INSERT INTO substitutions (date, group_name, pair, subject, teacher, room, note) VALUES (?, ?, ?, ?, ?, ?, ?)');
  let added = 0;
  db.exec('BEGIN');
  for (const s of items) {
    if (!s?.date || !s.group_name || !s.pair || !s.subject) continue;
    insert.run(s.date, s.group_name, Number(s.pair), s.subject, s.teacher || null, s.room || null, s.note || null);
    added++;
  }
  db.exec('COMMIT');
  res.status(201).json({ added });
});

admin.delete('/substitutions/:id', (req, res) => {
  db.prepare('DELETE FROM substitutions WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

admin.put('/settings/schedule', (req, res) => {
  const { bells, scheduleUrl, substitutionsUrl } = req.body || {};
  if (bells !== undefined) setSetting('bells', bells);
  if (scheduleUrl !== undefined) setSetting('scheduleUrl', scheduleUrl);
  if (substitutionsUrl !== undefined) setSetting('substitutionsUrl', substitutionsUrl);
  res.json({ ok: true });
});

admin.get('/notice', (req, res) => {
  res.json(getSetting('notice', {
    enabled: false,
    type: 'info',
    badge: 'Оголошення',
    title: '',
    text: '',
    dateInfo: '',
    actionText: '',
    actionUrl: ''
  }));
});

admin.put('/notice', (req, res) => {
  const { enabled, type, badge, title, text, dateInfo, actionText, actionUrl } = req.body || {};
  const current = getSetting('notice', {});
  const updated = {
    enabled: Boolean(enabled),
    type: type || current.type || 'info',
    badge: badge !== undefined ? String(badge).trim() : (current.badge || 'Оголошення'),
    title: title !== undefined ? String(title).trim() : (current.title || ''),
    text: text !== undefined ? String(text).trim() : (current.text || ''),
    dateInfo: dateInfo !== undefined ? String(dateInfo).trim() : (current.dateInfo || ''),
    actionText: actionText !== undefined ? String(actionText).trim() : (current.actionText || ''),
    actionUrl: actionUrl !== undefined ? String(actionUrl).trim() : (current.actionUrl || '')
  };
  setSetting('notice', updated);
  res.json({ ok: true, notice: updated });
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const d = new Date();
      const dir = path.join(UPLOADS, String(d.getFullYear()), String(d.getMonth() + 1).padStart(2, '0'));
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const base = slugify(Buffer.from(path.basename(file.originalname, ext), 'latin1').toString('utf8'));
      cb(null, `${base}-${Date.now().toString(36)}${ext}`);
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 }
});

admin.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Файл не передано' });
  res.status(201).json({ url: '/uploads/' + path.relative(UPLOADS, req.file.path).split(path.sep).join('/') });
});

api.use('/admin', admin);
app.use('/api', api);
app.use('/uploads', express.static(UPLOADS, { maxAge: '7d' }));

// У продакшені той самий сервер віддає зібраний фронтенд
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get('/*path', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(DIST, 'index.html'));
  });
}

app.listen(PORT, () => console.log(`API: http://localhost:${PORT}/api`));

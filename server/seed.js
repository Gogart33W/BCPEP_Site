// Імпорт контенту з content/*.json у SQLite.
// node server/seed.js          — додає нове, не чіпає змінене в адмінці
// node server/seed.js --force  — перезаписує все з дзеркала
import fs from 'node:fs';
import path from 'node:path';
import { db, setSetting } from './db.js';

const force = process.argv.includes('--force');
const dir = path.resolve('content');
const read = (name) => JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));

const menu = read('menu.json');
const pages = read('pages.json');
const news = read('news.json');
const home = read('home.json');

setSetting('menu', menu);
setSetting('home', home);

const pageSql = force
  ? `INSERT INTO pages (slug, title, content, documents) VALUES (?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET title = excluded.title, content = excluded.content, documents = excluded.documents`
  : `INSERT OR IGNORE INTO pages (slug, title, content, documents) VALUES (?, ?, ?, ?)`;

const newsSql = force
  ? `INSERT INTO news (slug, title, content, image, categories, documents, date) VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET title = excluded.title, content = excluded.content, image = excluded.image,
       categories = excluded.categories, documents = excluded.documents, date = excluded.date`
  : `INSERT OR IGNORE INTO news (slug, title, content, image, categories, documents, date) VALUES (?, ?, ?, ?, ?, ?, ?)`;

const insertPage = db.prepare(pageSql);
const insertNews = db.prepare(newsSql);

db.exec('BEGIN');
for (const p of pages) {
  insertPage.run(p.slug, p.title, p.content, JSON.stringify(p.documents || []));
}
for (const n of news) {
  insertNews.run(n.slug, n.title, n.content, n.image, JSON.stringify(n.categories || []),
    JSON.stringify(n.documents || []), n.date || new Date().toISOString());
}
db.exec('COMMIT');

const count = (t) => db.prepare(`SELECT COUNT(*) AS c FROM ${t}`).get().c;
console.log(`pages: ${count('pages')}, news: ${count('news')}`);

// Переносить контент з дзеркала HTTrack (Original_site) у JSON.
// Original_site лише читається, нічого там не змінюється.
// Запуск: node scripts/extract-site.mjs
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const ROOT = path.resolve('Original_site/www.bfcpep.org.ua');
const OUT = path.resolve('content');
const UPLOADS_OUT = path.resolve('storage/uploads');

const SKIP_DIRS = new Set([
  'page', 'category', 'tag', 'author', 'feed', 'comments', 'wp-json',
  'wp-content', 'wp-includes', 'wp-admin', 'hts-cache', 'search', 'embed'
]);

const assets = new Set();

function walk(dir, rel = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!rel && SKIP_DIRS.has(entry.name)) continue;
    if (SKIP_DIRS.has(entry.name) && ['feed', 'embed', 'page', 'comments'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (fs.existsSync(path.join(full, 'index.html'))) out.push(relPath);
    out.push(...walk(full, relPath));
  }
  return out;
}

// Перетворює посилання з дзеркала на шляхи нашого сайту
function rewriteUrl(raw, pageRel) {
  if (!raw) return raw;
  let url = raw.trim();
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) return url;

  const abs = url.match(/^https?:\/\/(www\.)?bfcpep\.org\.ua(\/.*)?$/i);
  if (abs) url = abs[2] || '/';

  if (/^https?:\/\//i.test(url) || url.startsWith('//')) return url;

  let resolved;
  if (url.startsWith('/')) {
    resolved = url.slice(1);
  } else {
    const base = path.posix.join(pageRel || '.', 'x');
    resolved = path.posix.normalize(path.posix.join(path.posix.dirname(base), url));
  }
  resolved = resolved.split('#')[0].split('?')[0];

  if (resolved.startsWith('wp-content/uploads/')) {
    const file = resolved.slice('wp-content/uploads/'.length);
    assets.add(file);
    return `/uploads/${file}`;
  }
  if (resolved.startsWith('wp-content/') || resolved.startsWith('wp-includes/')) return null;

  resolved = resolved.replace(/(^|\/)index[0-9a-f]*\.html$/, '').replace(/\/$/, '');
  return '/' + resolved;
}

function cleanContent($, $root, pageRel) {
  $root.find('script, style, noscript, link, meta, form, .et_pb_scroll_top, .sharedaddy, #comment-wrap, .nav-single').remove();

  // Divi малює обкладинку відео через background-image на оверлеї
  $root.find('.et_pb_video').each((_, el) => {
    const $el = $(el);
    const bg = ($el.find('.et_pb_video_overlay').attr('style') || '').match(/url\(['"]?([^'")]+)/);
    if (bg) $el.find('video').attr('poster', bg[1]);
    $el.find('.et_pb_video_overlay').remove();
  });

  $root.find('video, audio, source').each((_, el) => {
    const $el = $(el);
    const keep = {};
    for (const attr of ['src', 'poster', 'type']) {
      if ($el.attr(attr)) keep[attr] = attr === 'type' ? $el.attr(attr) : rewriteUrl($el.attr(attr), pageRel);
    }
    for (const attr of Object.keys(el.attribs)) $el.removeAttr(attr);
    for (const [k, v] of Object.entries(keep)) if (v) $el.attr(k, v);
    if (el.tagName !== 'source') $el.attr('controls', '').attr('preload', 'metadata');
  });

  $root.find('a').each((_, el) => {
    const $el = $(el);
    const href = rewriteUrl($el.attr('href'), pageRel);
    if (href === null) $el.removeAttr('href'); else if (href) $el.attr('href', href);
    const isButton = ($el.attr('class') || '').includes('et_pb_button');
    for (const attr of Object.keys(el.attribs)) {
      if (!['href', 'target', 'title'].includes(attr)) $el.removeAttr(attr);
    }
    if (isButton) $el.attr('class', 'content-btn');
  });

  $root.find('img').each((_, el) => {
    const $el = $(el);
    const src = rewriteUrl($el.attr('data-src') || $el.attr('src'), pageRel);
    const alt = $el.attr('alt') || '';
    for (const attr of Object.keys(el.attribs)) $el.removeAttr(attr);
    if (!src) { $el.remove(); return; }
    $el.attr('src', src).attr('alt', alt).attr('loading', 'lazy');
  });

  $root.find('iframe').each((_, el) => {
    const $el = $(el);
    const src = $el.attr('data-src') || $el.attr('src');
    for (const attr of Object.keys(el.attribs)) $el.removeAttr(attr);
    if (!src || src.startsWith('about:')) { $el.remove(); return; }
    $el.attr('src', src).attr('loading', 'lazy').attr('allowfullscreen', '');
  });

  $root.find('*').each((_, el) => {
    if (['a', 'img', 'iframe', 'video', 'audio', 'source'].includes(el.tagName)) return;
    const $el = $(el);
    for (const attr of Object.keys(el.attribs || {})) {
      if (['colspan', 'rowspan'].includes(attr)) continue;
      $el.removeAttr(attr);
    }
  });

  // Знімаємо порожні обгортки Divi
  for (let i = 0; i < 6; i++) {
    $root.find('div, span, p').each((_, el) => {
      const $el = $(el);
      if (!$el.text().trim() && !$el.find('img, iframe, video, audio, a, table, hr, br').length) $el.remove();
    });
    $root.find('div').each((_, el) => {
      const $el = $(el);
      const kids = $el.contents().filter((__, n) => n.type !== 'text' || n.data.trim());
      if (kids.length === 1 && kids[0].tagName === 'div') $el.replaceWith($el.html());
    });
  }

  return $root.html().replace(/\n\s*\n+/g, '\n').trim();
}

function extractDocuments($, html) {
  const $c = cheerio.load(`<div>${html}</div>`);
  const docs = [];
  $c('a[href]').each((_, el) => {
    const href = $c(el).attr('href');
    const title = $c(el).text().trim().replace(/\s+/g, ' ');
    if (/drive\.google\.com|docs\.google\.com/.test(href) || /\.(pdf|docx?|xlsx?|pptx?)$/i.test(href)) {
      docs.push({ title: title || 'Документ', url: href });
    }
  });
  return docs;
}

function parseMenu($) {
  const build = ($ul) => $ul.children('li').map((_, li) => {
    const $li = $(li);
    const $a = $li.children('a').first();
    const item = { title: $a.text().trim(), path: rewriteUrl($a.attr('href'), '') };
    const $sub = $li.children('ul');
    if ($sub.length) item.children = build($sub);
    return item;
  }).get();
  return build($('#top-menu'));
}

function pageTitle($) {
  const h1 = $('h1.entry-title, h1.main_title').first().text().trim();
  if (h1) return h1;
  const og = $('meta[property="og:title"]').attr('content');
  if (og) return og.replace(/\s*[-|–]\s*Бердичівський.*$/i, '').trim();
  return $('title').text().replace(/\s*[-|–]\s*Бердичівський.*$/i, '').trim();
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('Не знайдено Original_site/www.bfcpep.org.ua');
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  const home$ = cheerio.load(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'));
  const menu = parseMenu(home$);

  const pages = [];
  const news = [];
  const dirs = walk(ROOT);

  for (const rel of dirs) {
    const file = path.join(ROOT, rel, 'index.html');
    let html;
    try { html = fs.readFileSync(file, 'utf8'); } catch { continue; }
    const $ = cheerio.load(html);
    const bodyClass = $('body').attr('class') || '';
    const isPost = bodyClass.includes('single-post');
    const isPage = /\bpage\b/.test(bodyClass) && !bodyClass.includes('home');
    if (!isPost && !isPage) continue;

    const $content = $('.entry-content').first();
    if (!$content.length) continue;

    let content = cleanContent($, $content, rel);
    const title = pageTitle($);
    {
      const $c = cheerio.load(`<div id="r">${content}</div>`);
      const first = $c('#r h1').first();
      if (first.length && first.text().trim().toLowerCase() === title.toLowerCase()) first.remove();
      $c('#r h1').each((_, h) => { h.tagName = 'h2'; });
      content = $c('#r').html().trim();
    }
    const record = {
      slug: rel,
      title,
      content,
      documents: extractDocuments($, content)
    };

    if (isPost) {
      const og = $('meta[property="og:image"]').attr('content');
      news.push({
        ...record,
        date: $('meta[property="article:published_time"]').attr('content') || null,
        categories: $('.post-meta a[rel~="category"]').map((_, a) => $(a).text().trim()).get(),
        image: og ? rewriteUrl(og, rel) : null
      });
    } else {
      pages.push(record);
    }
  }

  news.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // Головна: плитки-посилання, відео-екскурсія, партнери
  const sections = home$('.entry-content .et_pb_section');
  const imgLinks = ($s) => $s.find('.et_pb_image a').map((_, a) => {
    const $a = home$(a);
    const $img = $a.find('img');
    return {
      href: rewriteUrl($a.attr('href'), ''),
      image: rewriteUrl($img.attr('src'), ''),
      title: $img.attr('title') || $img.attr('alt') || ''
    };
  }).get();
  let video = null;
  let tiles = [];
  let partners = [];
  sections.each((_, s) => {
    const $s = home$(s);
    const src = $s.find('video source').attr('src');
    if (src) {
      const bg = ($s.find('.et_pb_video_overlay').attr('style') || '').match(/url\(['"]?([^'")]+)/);
      video = { src: rewriteUrl(src, ''), poster: bg ? rewriteUrl(bg[1], '') : null };
      tiles = imgLinks($s);
    } else if ($s.text().includes('Наші партнери')) {
      partners = imgLinks($s);
    }
  });
  const home = { video, tiles, partners };

  fs.writeFileSync(path.join(OUT, 'menu.json'), JSON.stringify(menu, null, 2));
  fs.writeFileSync(path.join(OUT, 'pages.json'), JSON.stringify(pages, null, 2));
  fs.writeFileSync(path.join(OUT, 'news.json'), JSON.stringify(news, null, 2));
  fs.writeFileSync(path.join(OUT, 'home.json'), JSON.stringify(home, null, 2));

  // Копіюємо лише ті файли, на які є посилання
  let copied = 0, missing = 0;
  for (const file of assets) {
    const src = path.join(ROOT, 'wp-content/uploads', file);
    const dst = path.join(UPLOADS_OUT, file);
    if (!fs.existsSync(src)) { missing++; continue; }
    if (fs.existsSync(dst)) { copied++; continue; }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    copied++;
  }

  const menuPaths = [];
  const collect = (items) => items.forEach(i => { if (i.path) menuPaths.push(i.path); if (i.children) collect(i.children); });
  collect(menu);
  const pageSlugs = new Set(pages.map(p => '/' + p.slug));
  const missingMenu = menuPaths.filter(p => p !== '/' && !pageSlugs.has(p));

  console.log(`Меню: ${menuPaths.length} пунктів`);
  console.log(`Сторінки: ${pages.length}`);
  console.log(`Новини: ${news.length}`);
  console.log(`Файли: скопійовано ${copied}, ще не докачано ${missing}`);
  if (missingMenu.length) console.log('Пункти меню без сторінки:', missingMenu);
}

main();

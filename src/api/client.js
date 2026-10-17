import pagesData from '../../content/pages.json';
import newsData from '../../content/news.json';
import menuData from '../../content/menu.json';
import homeData from '../../content/home.json';

// Індекси для швидкого пошуку в офлайн-режимі
const pagesMap = new Map();
pagesData.forEach(p => pagesMap.set(p.slug.toLowerCase().replace(/^\/|\/$/g, ''), p));

const newsMap = new Map();
newsData.forEach(n => newsMap.set(n.slug.toLowerCase().replace(/^\/|\/$/g, ''), n));

export async function fetchMenu() {
  try {
    const res = await fetch('/api/menu');
    if (res.ok) return await res.json();
  } catch {}
  return menuData;
}

export async function fetchHome() {
  try {
    const res = await fetch('/api/home');
    if (res.ok) return await res.json();
  } catch {}
  return homeData;
}

export async function fetchNews({ page = 1, per = 12, category = '', q = '' } = {}) {
  try {
    const params = new URLSearchParams({ page, per });
    if (category) params.set('category', category);
    if (q) params.set('q', q);
    const res = await fetch(`/api/news?${params}`);
    if (res.ok) return await res.json();
  } catch {}

  // Fallback на статичний масив
  let filtered = newsData;
  if (category) {
    filtered = filtered.filter(n => n.categories && n.categories.includes(category));
  }
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(n => (n.title && n.title.toLowerCase().includes(query)) || (n.content && n.content.toLowerCase().includes(query)));
  }

  const total = filtered.length;
  const start = (page - 1) * per;
  const items = filtered.slice(start, start + per);

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / per)
  };
}

export async function fetchNewsCategories() {
  try {
    const res = await fetch('/api/news/categories');
    if (res.ok) return await res.json();
  } catch {}

  const counts = {};
  newsData.forEach(n => {
    (n.categories || []).forEach(c => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

export async function fetchPageOrNews(slug) {
  const cleanSlug = slug.toLowerCase().replace(/^\/|\/$/g, '');
  
  try {
    const res = await fetch(`/api/resolve/${cleanSlug}`);
    if (res.ok) {
      const { type } = await res.json();
      const contentRes = await fetch(`/api/${type === 'news' ? 'news' : 'pages'}/${cleanSlug}`);
      if (contentRes.ok) {
        return { type, data: await contentRes.json() };
      }
    }
  } catch {}

  // Fallback
  if (pagesMap.has(cleanSlug)) {
    return { type: 'page', data: pagesMap.get(cleanSlug) };
  }
  if (newsMap.has(cleanSlug)) {
    return { type: 'news', data: newsMap.get(cleanSlug) };
  }

  return null;
}

export async function fetchSchedule(group = '') {
  try {
    const res = await fetch(group ? `/api/schedule/${group}` : '/api/settings/schedule');
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

export async function fetchGroups() {
  try {
    const res = await fetch('/api/groups');
    if (res.ok) return await res.json();
  } catch {}
  return [];
}

export async function fetchSubstitutions(group = '') {
  try {
    const res = await fetch(group ? `/api/substitutions?group=${group}` : '/api/substitutions');
    if (res.ok) return await res.json();
  } catch {}
  return [];
}

export async function fetchNotice() {
  try {
    const res = await fetch('/api/notice');
    if (res.ok) return await res.json();
  } catch {}
  return { enabled: false };
}

export async function fetchAdminNotice(token) {
  try {
    const res = await fetch('/api/admin/notice', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) return await res.json();
  } catch {}
  return { enabled: false };
}

export async function saveAdminNotice(token, notice) {
  const res = await fetch('/api/admin/notice', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(notice)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Помилка збереження оголошення');
  }
  return await res.json();
}


import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const DB_PATH = process.env.DB_PATH || path.resolve('storage/bcpep.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pages (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    documents TEXT NOT NULL DEFAULT '[]',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    image TEXT,
    categories TEXT NOT NULL DEFAULT '[]',
    documents TEXT NOT NULL DEFAULT '[]',
    date TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS news_date ON news(date DESC);

  CREATE TABLE IF NOT EXISTS groups (
    name TEXT PRIMARY KEY,
    specialty TEXT,
    course INTEGER
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name TEXT NOT NULL REFERENCES groups(name) ON DELETE CASCADE ON UPDATE CASCADE,
    weekday INTEGER NOT NULL CHECK (weekday BETWEEN 1 AND 6),
    pair INTEGER NOT NULL CHECK (pair BETWEEN 1 AND 8),
    subject TEXT NOT NULL,
    teacher TEXT,
    room TEXT
  );

  CREATE TABLE IF NOT EXISTS substitutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    group_name TEXT NOT NULL,
    pair INTEGER NOT NULL,
    subject TEXT NOT NULL,
    teacher TEXT,
    room TEXT,
    note TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS subs_date ON substitutions(date);

  CREATE TABLE IF NOT EXISTS admins (
    email TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL REFERENCES admins(email) ON DELETE CASCADE,
    expires_at TEXT NOT NULL
  );
`);

export function getSetting(key, fallback = null) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? JSON.parse(row.value) : fallback;
}

export function setSetting(key, value) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .run(key, JSON.stringify(value));
}

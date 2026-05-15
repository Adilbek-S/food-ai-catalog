import Database, { Database as BetterSqlite3Database } from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const DB_PATH = path.join(dataDir, 'catalog.db');

const db: BetterSqlite3Database = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    cuisine     TEXT    NOT NULL,
    city        TEXT    NOT NULL,
    price_range INTEGER NOT NULL DEFAULT 2 CHECK(price_range BETWEEN 1 AND 3),
    rating      REAL    NOT NULL DEFAULT 0,
    image_url   TEXT    NOT NULL DEFAULT '',
    description TEXT    NOT NULL DEFAULT '',
    address     TEXT    NOT NULL DEFAULT '',
    phone       TEXT    NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name          TEXT    NOT NULL,
    description   TEXT    NOT NULL DEFAULT '',
    price         REAL    NOT NULL,
    category      TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cart (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_item_id INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity     INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
    created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

export default db;

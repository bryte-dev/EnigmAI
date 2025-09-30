// src/db.ts
import Database from "better-sqlite3";
import { join } from "path";
import { fileURLToPath } from "url";

// Pour gérer __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// DB à la racine de src/
const dbPath = join(__dirname, "enigmai.db");
const db = new Database(dbPath);

// Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS riddles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    hint TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER DEFAULT 0
  );
`);

export default db;

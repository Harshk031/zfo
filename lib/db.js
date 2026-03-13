import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db;

export function getDb() {
  if (!db) {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, 'orders.db');
    db = new Database(dbPath);

    // Initial setup — create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        optionId TEXT NOT NULL,
        amount INTEGER NOT NULL,
        customerName TEXT NOT NULL,
        customerPhone TEXT NOT NULL,
        customerEmail TEXT,
        customerAddress TEXT NOT NULL,
        razorpayOrderId TEXT,
        razorpayPaymentId TEXT,
        status TEXT NOT NULL DEFAULT 'CREATED',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
  return db;
}

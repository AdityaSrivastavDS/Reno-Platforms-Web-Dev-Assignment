// lib/db.js
import { Pool } from 'pg'

let pool

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL, // Neon gives you this
      ssl: { rejectUnauthorized: false },         // required for Neon
    })
  }
  return pool
}

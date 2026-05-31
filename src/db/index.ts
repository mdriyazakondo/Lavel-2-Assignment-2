import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
  connectionString: config.DATABASE_URI,
});

export const initDB = async () => {
  try {
    // USERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        age INTEGER,
        role VARCHAR(50) NOT NULL DEFAULT 'contributor'
          CHECK (role IN ('contributor', 'maintainer')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ISSUES TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        issue_type VARCHAR(50) NOT NULL
          CHECK (issue_type IN ('bug', 'feature_request')),
        status VARCHAR(50) DEFAULT 'open'
          CHECK (status IN ('open', 'in_progress', 'resolved')),
        reporter_id INT NOT NULL
          REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database init error:", error);
  }
};

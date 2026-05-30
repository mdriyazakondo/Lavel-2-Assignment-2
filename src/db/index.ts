import { Pool } from "pg";
import { config } from "../config/index.js";

const pool = new Pool({
  connectionString: config.DATABASE_URI,
});

const initDB = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        age INTEGER,
        role VARCHAR(50) DEFAULT 'contributor',

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export { pool, initDB };

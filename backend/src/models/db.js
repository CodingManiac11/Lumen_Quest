const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

async function connectDB() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await pool.getConnection();
    console.log(" MySQL connected to", process.env.DB_NAME);
    conn.release();

    return pool;
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1);
  }
}

function getPool() {
  if (!pool) throw new Error("DB not connected yet!");
  return pool;
}

module.exports = { connectDB, getPool };

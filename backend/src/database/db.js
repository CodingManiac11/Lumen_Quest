const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Create MySQL pool (after DB setup)
let pool;

// Test connection
const testConnection = async () => {
  try {
    if (!pool) {
      throw new Error("Pool not initialized");
    }
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    return false;
  }
};

// Initialize DB schema and seed data
const initializeDatabase = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedPath = path.join(__dirname, 'seed.sql');

    const schema = await fs.readFile(schemaPath, 'utf8');
    const seedData = await fs.readFile(seedPath, 'utf8');

    // Connect without database to run CREATE DATABASE
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Execute schema and seed
    await connection.query(schema);
    console.log('Database schema initialized successfully');

    await connection.query(seedData);
    console.log('Sample data inserted successfully');

    await connection.end();

    // Now create the pool for the app
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'subscription_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 60000,
    });

    return pool;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`Schema or seed file not found. Make sure:
        - ${path.join(__dirname, 'schema.sql')} exists
        - ${path.join(__dirname, 'seed.sql')} exists`);
    } else {
      console.error(' Database initialization failed:', error.message);
    }
    throw error;
  }
};

//  Export both functions
module.exports = {
  initializeDatabase,
  testConnection,
  pool: () => pool
};
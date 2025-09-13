const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'subscription_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Test connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

// Initialize database with schema
const initializeDatabase = async () => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    
    // Read and execute schema
    const schemaPath = path.join('/backend/src/database/schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.execute(statement);
      }
    }
    
    console.log('Database schema initialized successfully');
    
    // Execute seed data
    const seedPath = path.join('/backend/src/database/seed.sql');
    const seedData = await fs.readFile(seedPath, 'utf8');
    
    const seedStatements = seedData.split(';').filter(stmt => stmt.trim());
    
    for (const statement of seedStatements) {
      if (statement.trim()) {
        await pool.execute(statement);
      }
    }
    
    console.log('Sample data inserted successfully');
    
  } catch (error) {
    console.error('Database initialization failed:', error.message);
  }
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};

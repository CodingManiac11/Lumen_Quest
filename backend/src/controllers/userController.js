const db = require('../models/db');
const bcrypt = require('bcryptjs');

// Get my profile
exports.getMyProfile = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, name, email, phone, role, status, created_at, updated_at FROM Users WHERE user_id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update my profile
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    let query = 'UPDATE Users SET ';
    const params = [];
    
    if (name) { query += 'name = ?, '; params.push(name); }
    if (phone) { query += 'phone = ?, '; params.push(phone); }
    if (password) {
      const password_hash = await bcrypt.hash(password, 10);
      query += 'password_hash = ?, '; 
      params.push(password_hash);
    }

    query = query.slice(0, -2); // Remove trailing comma
    query += ' WHERE user_id = ?';
    params.push(req.user.id);

    await db.query(query, params);
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete my account
exports.deleteMyAccount = async (req, res) => {
  try {
    await db.query('DELETE FROM Users WHERE user_id = ?', [req.user.id]);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID (Admin only)
exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, name, email, phone, role, status, created_at, updated_at FROM Users WHERE user_id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, name, email, phone, role, status, created_at, updated_at FROM Users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

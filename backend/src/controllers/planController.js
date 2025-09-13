const db = require('../models/db');

// Create a new plan (Admin only)
exports.createPlan = async (req, res) => {
  try {
    const { plan_name, price, quota_sessions, validity_days, auto_renewal_allowed, description, status } = req.body;
    const [result] = await db.query(
      `INSERT INTO Plans 
      (plan_name, price, quota_sessions, validity_days, auto_renewal_allowed, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [plan_name, price, quota_sessions, validity_days, auto_renewal_allowed, description, status]
    );
    res.status(201).json({ message: 'Plan created', planId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Plans');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Plans WHERE plan_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Plan not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a plan (Admin only)
exports.updatePlan = async (req, res) => {
  try {
    const { plan_name, price, quota_sessions, validity_days, auto_renewal_allowed, description, status } = req.body;
    const [result] = await db.query(
      `UPDATE Plans SET plan_name=?, price=?, quota_sessions=?, validity_days=?, auto_renewal_allowed=?, description=?, status=? 
       WHERE plan_id=?`,
      [plan_name, price, quota_sessions, validity_days, auto_renewal_allowed, description, status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a plan (Admin only)
exports.deletePlan = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Plans WHERE plan_id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

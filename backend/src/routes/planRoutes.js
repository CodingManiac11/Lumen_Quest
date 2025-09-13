const express = require('express');
const router = express.Router();
const planController = require('./src/controllers/planController.js');

// Middleware to simulate Admin check
const adminOnly = (req, res, next) => {
  const isAdmin = req.headers['x-admin']; // Example: send x-admin=true in headers
  if (isAdmin === 'true') return next();
  return res.status(403).json({ message: 'Admin access required' });
};

// Plan routes
router.post('/', adminOnly, planController.createPlan);        // Admin only
router.get('/', planController.getAllPlans);                    // Public
router.get('/:id', planController.getPlanById);                 // Public
router.put('/:id', adminOnly, planController.updatePlan);       // Admin only
router.delete('/:id', adminOnly, planController.deletePlan);    // Admin only

module.exports = router;

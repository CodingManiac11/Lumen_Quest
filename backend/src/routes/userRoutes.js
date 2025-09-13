const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Authenticated user routes
router.get('/me', authMiddleware, userController.getMyProfile);
router.put('/me', authMiddleware, userController.updateMyProfile);
router.delete('/me', authMiddleware, userController.deleteMyAccount);

// Admin-only routes
router.get('/:id', authMiddleware, userController.getUserById);       // Admin only
router.get('/', authMiddleware, userController.getAllUsers);          // Admin only

module.exports = router;

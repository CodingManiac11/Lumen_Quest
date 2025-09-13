const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth routes
router.post('/register', authController.register);           // Register new user
router.post('/login', authController.login);                 // Login
router.post('/logout', authController.logout);               // Logout
router.post('/refresh', authController.refreshToken);        // Refresh JWT token

module.exports = router;

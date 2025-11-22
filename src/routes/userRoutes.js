// src/routes/user.routes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authenticate, requireRole } = require('../middleware/auth');

// Public
router.post('/register', userController.register);
router.post('/login', userController.login);

// Authenticated “me” routes
router.get('/me', authenticate, userController.getMe);
router.put('/me', authenticate, userController.updateMe);
router.delete('/me', authenticate, userController.deleteMe);

// Admin-only
router.get('/', authenticate, requireRole('ADMIN'), userController.listUsers);

module.exports = router;

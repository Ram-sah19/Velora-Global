const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/founders', userController.getFounders);
router.get('/me', userController.getCurrentUser);
router.post('/logout', userController.logoutUser);
router.post('/register', userController.registerStudent);
router.post('/register-student', userController.registerStudent);
router.post('/register-client', userController.registerClient);
router.post('/register-admin', userController.registerAdmin);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Admin-protected routes
router.get('/', requireAdmin, userController.getUsers);
router.delete('/:id', requireAdmin, userController.deleteUser);

module.exports = router;

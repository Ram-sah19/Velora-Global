const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/founders', userController.getFounders);
router.get('/me', userController.getCurrentUser);
router.post('/logout', userController.logoutUser);
router.post('/register', userController.registerStudent);
router.post('/register-student', userController.registerStudent);
router.post('/register-client', userController.registerClient);
router.post('/register-admin', userController.registerAdmin);
router.post('/login', userController.loginUser);

module.exports = router;

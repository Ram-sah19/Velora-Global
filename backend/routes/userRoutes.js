const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/founders', userController.getFounders);
router.post('/register', userController.registerStudent);

module.exports = router;

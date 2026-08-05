const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getTasks);
router.post('/assign', taskController.assignTask);
router.put('/:id/submit', taskController.submitTask);

module.exports = router;

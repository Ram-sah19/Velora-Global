const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { requireAdmin } = require('../middleware/authMiddleware');

// Public: Students view their own tasks (filtered by studentId in query)
router.get('/', taskController.getTasks);
router.put('/:id/submit', taskController.submitTask);

// Admin only: Assign tasks to students
router.post('/assign', requireAdmin, taskController.assignTask);

module.exports = router;

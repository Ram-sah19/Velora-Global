const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Tasks name a student and their program, so the full list is a staff view.
router.get('/', requireAdmin, taskController.getTasks);
// Submitting is a student action and must come from a signed-in account.
router.put('/:id/submit', requireAuth, taskController.submitTask);

// Admin only: Assign tasks to students
router.post('/assign', requireAdmin, taskController.assignTask);

module.exports = router;

const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const { requireAdmin } = require('../middleware/authMiddleware');

// Admin only: View and submit evaluations (which also issue certificates)
router.get('/', requireAdmin, evaluationController.getEvaluations);
router.post('/', requireAdmin, evaluationController.evaluateTask);

module.exports = router;

const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

router.get('/', evaluationController.getEvaluations);
router.post('/', evaluationController.evaluateTask);

module.exports = router;

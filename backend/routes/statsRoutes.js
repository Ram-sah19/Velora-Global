const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { requireAdmin } = require('../middleware/authMiddleware');

// Counts plus the five most recent applications and evaluations, so this is a
// staff view. It is deliberately not cached: the response cache keys on the URL
// alone and would replay this payload to callers without a session.
router.get('/', requireAdmin, statsController.getStats);

module.exports = router;

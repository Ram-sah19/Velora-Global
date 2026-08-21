const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { cacheMiddleware } = require('../services/redisCache');

// Cache dashboard stats for 2 minutes
router.get('/', cacheMiddleware(120), statsController.getStats);

module.exports = router;

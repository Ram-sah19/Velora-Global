const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { requireAdmin } = require('../middleware/authMiddleware');
const { cacheMiddleware } = require('../services/redisCache');

// Public: Browse programs with 5-minute In-Memory Cache (sub-millisecond response)
router.get('/', cacheMiddleware(300), programController.getPrograms);
router.get('/:id', cacheMiddleware(300), programController.getProgramById);

// Admin only: Create new programs
router.post('/', requireAdmin, programController.createProgram);

module.exports = router;

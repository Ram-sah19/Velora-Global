const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { requireAdmin } = require('../middleware/authMiddleware');

// Public: Browse programs (visible on homepage, internships, training pages)
router.get('/', programController.getPrograms);
router.get('/:id', programController.getProgramById);

// Admin only: Create new programs
router.post('/', requireAdmin, programController.createProgram);

module.exports = router;

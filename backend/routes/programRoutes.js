const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.get('/', programController.getPrograms);
router.get('/:id', programController.getProgramById);
router.post('/', programController.createProgram);

module.exports = router;

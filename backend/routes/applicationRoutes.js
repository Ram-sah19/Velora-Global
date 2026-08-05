const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getApplications);
router.post('/', applicationController.submitApplication);
router.put('/:id/status', applicationController.updateStatus);

module.exports = router;

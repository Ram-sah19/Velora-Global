const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Applications & Enrollments Endpoints
router.get('/', applicationController.getApplications);
router.post('/', applicationController.submitApplication);
router.put('/:id/status', applicationController.updateStatus);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;

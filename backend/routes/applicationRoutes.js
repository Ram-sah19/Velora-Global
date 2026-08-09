const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { requireAdmin } = require('../middleware/authMiddleware');

// Public: Students submit applications & view their own (filtered by studentId in query)
router.get('/', applicationController.getApplications);
router.post('/', applicationController.submitApplication);

// Admin only: Approve / Reject / update application status
router.put('/:id/status', requireAdmin, applicationController.updateStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const applicationController = require('../controllers/applicationController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

const isDev = process.env.NODE_ENV !== 'production';

// Applications carry names, emails and institutions, so only the public form that
// creates one is open; reading, changing and deleting them is a staff action.
const applicationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 100 : 8,
  message: { error: 'Too many submissions from this address. Please try again in a few minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

router.get('/', requireAdmin, applicationController.getApplications);
// A session cookie is required to apply, and the record is tied to that account,
// so an outsider cannot enroll in someone else's name.
router.post('/', requireAuth, applicationLimiter, applicationController.submitApplication);
router.put('/:id/status', requireAdmin, applicationController.updateStatus);
router.put('/:id', requireAdmin, applicationController.updateApplication);
router.delete('/:id', requireAdmin, applicationController.deleteApplication);

module.exports = router;

const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { requireAdmin } = require('../middleware/authMiddleware');

router.post('/', inquiryController.submitInquiry);
router.get('/', requireAdmin, inquiryController.getInquiries);

module.exports = router;

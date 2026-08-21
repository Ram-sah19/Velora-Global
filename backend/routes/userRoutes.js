const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const userController = require('../controllers/userController');
const { requireAdmin } = require('../middleware/authMiddleware');
const { cacheMiddleware } = require('../services/redisCache');

const isDev = process.env.NODE_ENV !== 'production';

// ─── Rate Limiters for sensitive endpoints ─────────────────────────────────
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 200 : 5,
  message: { error: 'Too many OTP attempts. Please wait 15 minutes and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDev ? 100 : 5,
  message: { error: 'Too many password reset requests. Please wait 1 hour.' },
  standardHeaders: true,
  legacyHeaders: false
});

const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isDev ? 100 : 5,
  message: { error: 'Too many password reset attempts. Please wait 1 hour.' },
  standardHeaders: true,
  legacyHeaders: false
});

// ─── Public routes ──────────────────────────────────────────────────────────

// Founders — cached in-memory for 10 minutes (sub-2ms response)
router.get('/founders', cacheMiddleware(600), userController.getFounders);

router.get('/me', userController.getCurrentUser);
router.post('/logout', userController.logoutUser);

router.post('/register', userController.registerStudent);
router.post('/register-student', userController.registerStudent);
router.post('/register-client', userController.registerClient);

// Admin registration is rate-limited strictly — 3 per day per IP in production
router.post('/register-admin', rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: isDev ? 50 : 3,
  message: { error: 'Too many admin registration attempts.' },
  standardHeaders: true, legacyHeaders: false
}), userController.registerAdmin);

router.post('/login', userController.loginUser);

router.post('/forgot-password', forgotPasswordLimiter, userController.forgotPassword);
router.post('/reset-password', resetPasswordLimiter, userController.resetPassword);

router.post('/verify-email', otpLimiter, userController.verifyEmail);
router.post('/verify-otp', otpLimiter, userController.verifyOtp);
router.post('/resend-verification', otpLimiter, userController.resendVerification);
router.post('/resend-otp', otpLimiter, userController.resendOtp);
router.post('/send-phone-otp', otpLimiter, userController.sendPhoneOtp);
router.post('/verify-phone-otp', otpLimiter, userController.verifyPhoneOtp);

// ─── Admin-protected routes ─────────────────────────────────────────────────
router.get('/', requireAdmin, userController.getUsers);
router.delete('/:id', requireAdmin, userController.deleteUser);

module.exports = router;

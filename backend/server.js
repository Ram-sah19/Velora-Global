require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const fs = require('fs');
const path = require('path');
const { connectDB } = require('./db');

const userRoutes = require('./routes/userRoutes');
const programRoutes = require('./routes/programRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const taskRoutes = require('./routes/taskRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const statsRoutes = require('./routes/statsRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Sync leadership media assets
try {
  const srcRam = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\a4d534a8-3984-4b8e-bff6-79644a6f4e38\\.user_uploaded\\media_1787455923289.jpg';
  const srcShiv = 'C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded\\media_1787288100477.jpg';
  const dirs = [
    path.join(__dirname, '..', 'frontend', 'public', 'media'),
    path.join(__dirname, '..', 'frontend', 'public', 'images')
  ];
  for (const d of dirs) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    if (fs.existsSync(srcRam)) {
      fs.copyFileSync(srcRam, path.join(d, 'ram_sah.jpg'));
      fs.copyFileSync(srcRam, path.join(d, 'rambilas_sah.jpg'));
    }
    if (fs.existsSync(srcShiv)) fs.copyFileSync(srcShiv, path.join(d, 'shivshankar_sah.jpg'));
  }
} catch (e) {
  console.warn('Media copy check:', e.message);
}



// ─── 1. SECURITY HTTP HEADERS (Helmet) ────────────────────────────────────────
// Removes X-Powered-By, sets X-Frame-Options, X-Content-Type-Options, HSTS, etc.
app.use(helmet({
  crossOriginEmbedderPolicy: false, // Allow avatar image embeds from dicebear
  contentSecurityPolicy: false      // CSP handled by Cloudflare on frontend
}));

// ─── 2. CORS — Dynamic & Production Domain Matching ─────────────────────────
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow server-to-server and curl in dev

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:3000',
      'https://velora-global.online',
      'https://www.velora-global.online'
    ];

    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith('.pages.dev') ||
      (process.env.CLIENT_ORIGIN && origin === process.env.CLIENT_ORIGIN);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With']
};
app.use(cors(corsOptions));

// ─── 3. BODY SIZE LIMIT — Prevent large payload DoS ──────────────────────────
app.use(express.json({ limit: '10kb' }));

// ─── 4. NoSQL INJECTION SANITIZATION ─────────────────────────────────────────
// Strips $ and . from req.body, req.params, req.query to block MongoDB operator injection
app.use(mongoSanitize());

// ─── 5. RATE LIMITING — Login endpoint brute-force protection ─────────────────
const isDev = process.env.NODE_ENV !== 'production';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 500 : 20,     // 500 in dev, 20 in prod
  message: { error: 'Too many login attempts. Please wait 15 minutes and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: isDev ? 100 : 5,       // 5 registrations per 15 min per IP in production
  message: { error: 'Too many registration attempts. Please wait 15 minutes and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: isDev ? 100 : 10,     // 10 inquiries per 15 min per IP in prod
  message: { error: 'Too many inquiry submissions. Please wait 15 minutes and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiters
app.use('/api/users/login', loginLimiter);
app.use('/api/users/register', registerLimiter);
app.use('/api/users/register-student', registerLimiter);
app.use('/api/users/register-client', registerLimiter);
app.use('/api/users/register-admin', loginLimiter);
app.use('/api/client-inquiries', inquiryLimiter);

// ─── 6. DATABASE CONNECTION ───────────────────────────────────────────────────
connectDB();

// ─── 7. HEALTH CHECK ─────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Velora Global Enterprise Server', timestamp: new Date() });
});

// ─── 8. ROUTES ────────────────────────────────────────────────────────────────
app.use('/api/users', userRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/client-inquiries', inquiryRoutes);

// ─── 8.1 SERVE REACT FRONTEND PRODUCTION BUILD ──────────────────────────────
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// ─── 9. GLOBAL ERROR HANDLER ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  if (err.message && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({ error: 'CORS: Origin not allowed.' });
  }
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`🌐 Velora Global Backend Server running on port ${PORT}`);
  console.log(`🔒 Security: Helmet ✓ | Rate Limiting ✓ | NoSQL Sanitize ✓ | CORS Strict ✓`);

  // ─── 10. CRON HEARTBEAT — Self Keep-Alive Ping Every 14 Minutes ─────────────
  const https = require('https');
  const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds
  setInterval(() => {
    https.get('https://velora-global.onrender.com/api/health', (res) => {
      console.log(`[CRON HEARTBEAT] Keep-alive ping sent to Render backend (Status: ${res.statusCode})`);
    }).on('error', (err) => {
      console.error('[CRON HEARTBEAT] Ping error:', err.message);
    });
  }, PING_INTERVAL);
});

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

const app = express();
const PORT = process.env.PORT || 5000;

// Sync executive founder photos (development environment helper)
try {
  const srcDir = `C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded`;
  if (fs.existsSync(srcDir)) {
    const destDir = path.join(__dirname, '../frontend/public/media');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    if (fs.existsSync(path.join(srcDir, 'media_1785955734224.jpg'))) {
      fs.copyFileSync(path.join(srcDir, 'media_1785955734224.jpg'), path.join(destDir, 'rambilas_sah.jpg'));
    }
    if (fs.existsSync(path.join(srcDir, 'media_1785955759112.jpg'))) {
      fs.copyFileSync(path.join(srcDir, 'media_1785955759112.jpg'), path.join(destDir, 'puja_rouniyar.jpg'));
    }
    if (fs.existsSync(path.join(srcDir, 'media_1785955812212.jpg'))) {
      fs.copyFileSync(path.join(srcDir, 'media_1785955812212.jpg'), path.join(destDir, 'rohit_sah.jpg'));
    }
  }
} catch (e) {}

// ─── 1. SECURITY HTTP HEADERS (Helmet) ────────────────────────────────────────
// Removes X-Powered-By, sets X-Frame-Options, X-Content-Type-Options, HSTS, etc.
app.use(helmet({
  crossOriginEmbedderPolicy: false, // Allow avatar image embeds from dicebear
  contentSecurityPolicy: false      // CSP handled by Cloudflare on frontend
}));

// ─── 2. CORS — Strict Origin Matching ─────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  process.env.CLIENT_ORIGIN    // e.g. https://velora-global.pages.dev on Cloudflare
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
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
  windowMs: 1 * 60 * 1000,   // 1 minute
  max: 40,                   // 40 registration attempts per minute per IP
  message: { error: 'Too many registration attempts. Please wait 1 minute and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiters
app.use('/api/users/login', loginLimiter);
app.use('/api/users/register', registerLimiter);
app.use('/api/users/register-student', registerLimiter);
app.use('/api/users/register-client', registerLimiter);
app.use('/api/users/register-admin', loginLimiter);

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

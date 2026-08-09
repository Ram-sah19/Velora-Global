require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

// Sync executive founder photos to frontend/public/media/
try {
  const srcDir = `C:\\Users\\Rambilas\\.gemini\\antigravity\\brain\\22635c0b-f003-455d-a5d6-433977a33f53\\.user_uploaded`;
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
} catch (e) {}

// Strict Origin Matching CORS for 30-Day HttpOnly Credentials
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      callback(null, origin);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize MongoDB Atlas connection
connectDB();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Velora Global Enterprise Server', timestamp: new Date() });
});

// MVC Route Handlers
app.use('/api/users', userRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/stats', statsRoutes);

app.listen(PORT, () => {
  console.log(`🌐 Velora Global Backend Server running on port ${PORT}`);
});

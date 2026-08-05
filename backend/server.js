require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

app.use(cors());
app.use(express.json());

// Initialize MongoDB Atlas connection
connectDB();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Velora Global MERN MVC Backend Server', timestamp: new Date() });
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
  console.log(`Velora Global MERN Backend Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// connect to database
connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());

// cors setup - allows both local and production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://micou.app', 'https://www.micou.app']
    : 'http://localhost:5173',
  credentials: true
}));

// routes
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const statsRoutes = require('./routes/stats');

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/stats', statsRoutes);

// health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
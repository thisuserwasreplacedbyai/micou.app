// stats routes - calculate and return user statistics
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const auth = require('../middleware/auth');

// get this week's activity breakdown
router.get('/week', auth, async (req, res) => {
  try {
    // calculate start of this week (monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    // get all sessions since monday
    const sessions = await Session.find({
      userId: req.userId,
      startTime: { $gte: weekStart }
    });

    // group by activity and sum durations
    const breakdown = {};
    sessions.forEach(session => {
      if (!breakdown[session.activity]) {
        breakdown[session.activity] = 0;
      }
      breakdown[session.activity] += session.duration;
    });

    res.json(breakdown);
  } catch (error) {
    res.status(500).json({ message: 'server error getting week stats' });
  }
});

// get all-time totals per activity
router.get('/alltime', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId });

    // group by activity and sum durations
    const totals = {};
    sessions.forEach(session => {
      if (!totals[session.activity]) {
        totals[session.activity] = 0;
      }
      totals[session.activity] += session.duration;
    });

    res.json(totals);
  } catch (error) {
    res.status(500).json({ message: 'server error getting alltime stats' });
  }
});

// get current streak (consecutive days with sessions)
router.get('/streak', auth, async (req, res) => {
  try {
    // get all user sessions, sorted by date descending
    const sessions = await Session.find({ userId: req.userId }).sort({ startTime: -1 });

    if (sessions.length === 0) {
      return res.json({ streak: 0 });
    }

    // track unique days with sessions
    const daysWithSessions = new Set();
    sessions.forEach(session => {
      const date = new Date(session.startTime);
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      daysWithSessions.add(dayKey);
    });

    // convert to sorted array
    const sortedDays = Array.from(daysWithSessions).sort().reverse();

    // calculate streak from today backwards
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    let streak = 0;
    let checkDate = new Date();

    for (let i = 0; i < sortedDays.length; i++) {
      const checkKey = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
      
      if (sortedDays[i] === checkKey) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ streak });
  } catch (error) {
    res.status(500).json({ message: 'server error calculating streak' });
  }
});

module.exports = router;
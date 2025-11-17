const express = require('express');
const Session = require('../models/Session');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// all routes require authentication
router.use(authMiddleware);

// create new session
router.post('/', async (req, res) => {
  try {
    const { activity, startTime, endTime, duration, notes } = req.body;
    
    const session = new Session({
      userId: req.userId,
      activity,
      startTime,
      endTime,
      duration,
      notes
    });
    
    await session.save();
    res.status(201).json({ message: 'session created', session });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

// get all user sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

// get single session
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (!session) {
      return res.status(404).json({ message: 'session not found' });
    }
    
    res.json({ session });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

// update session
router.put('/:id', async (req, res) => {
  try {
    const { activity, startTime, endTime, duration, notes } = req.body;
    
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { activity, startTime, endTime, duration, notes },
      { new: true, runValidators: true }
    );
    
    if (!session) {
      return res.status(404).json({ message: 'session not found' });
    }
    
    res.json({ message: 'session updated', session });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

// delete session
router.delete('/:id', async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (!session) {
      return res.status(404).json({ message: 'session not found' });
    }
    
    res.json({ message: 'session deleted' });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// helper function for cookie options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production (https only)
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' allows cross-domain
  maxAge: 7 * 24 * 60 * 60 * 1000,
  domain: process.env.NODE_ENV === 'production' ? '.micou.app' : undefined // shares cookie across subdomains
});

// signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'user already exists' });
    }
    
    // create user
    const user = new User({ email, password });
    await user.save();
    
    // create jwt token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // set cookie
    res.cookie('token', token, getCookieOptions());
    
    res.status(201).json({
      message: 'user created successfully',
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'invalid credentials' });
    }
    
    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'invalid credentials' });
    }
    
    // create jwt token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // set cookie
    res.cookie('token', token, getCookieOptions());
    
    res.json({
      message: 'logged in successfully',
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

// logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', getCookieOptions());
  res.json({ message: 'logged out successfully' });
});

// get current user (protected route)
const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

module.exports = router;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  character: {
    type: Number,
    default: 1,
    min: 1,
    max: 2
  },
  streakGoal: {
    type: {
      type: String,
      enum: ['daily-10min', 'daily-30min', 'daily-1hr', 'weekly-5days'],
      default: 'daily-30min'
    },
    value: {
      type: Number,
      default: 30
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// followed tutorial for this part using bycrypt to hash password so I don't store blank text
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// method from tutorial to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
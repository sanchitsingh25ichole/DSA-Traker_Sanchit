const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const { Problem } = require('../models/Problem');
const starterProblems = require('../data/starterProblems');
const { users, problems } = require('../config/memoryStore');

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'dsa_tracker_super_secret_jwt_key_2026_xyz', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Connected to real MongoDB
    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: normalizedEmail });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password
      });

      if (user) {
        // Seed starter problems
        try {
          const userStarters = starterProblems.map((prob) => ({
            ...prob,
            userId: user._id
          }));
          await Problem.insertMany(userStarters);
        } catch (seedErr) {
          console.warn('Could not seed starter problems:', seedErr.message);
        }

        return res.status(201).json({
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          },
          token: generateToken(user._id)
        });
      }
    } else {
      // 2. In-memory fallback mode
      const userExists = users.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        _id: new mongoose.Types.ObjectId().toString(),
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        createdAt: new Date()
      };
      users.push(newUser);

      // Seed starter problems in memory
      starterProblems.forEach((prob, idx) => {
        problems.push({
          _id: new mongoose.Types.ObjectId().toString(),
          userId: newUser._id,
          title: prob.title,
          topic: prob.topic,
          difficulty: prob.difficulty,
          problemLink: prob.problemLink,
          status: prob.status,
          notes: prob.notes,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });

      return res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt
        },
        token: generateToken(newUser._id)
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Connected to real MongoDB
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: normalizedEmail });

      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          },
          token: generateToken(user._id)
        });
      }
    } else {
      // 2. In-memory fallback
      const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          },
          token: generateToken(user._id)
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      return res.json({
        success: true,
        user
      });
    } else {
      const user = users.find((u) => u._id.toString() === req.user._id.toString());
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      return res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};

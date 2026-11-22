const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { Problem } = require('../models/Problem');
const { users, problems } = require('../config/memoryStore');

// @desc    Get user profile with summary metrics
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    let userObj = null;
    let userProblems = [];

    if (mongoose.connection.readyState === 1) {
      userObj = await User.findById(req.user._id).select('-password');
      userProblems = await Problem.find({ userId: req.user._id });
    } else {
      userObj = users.find((u) => u._id.toString() === userId);
      userProblems = problems.filter((p) => p.userId.toString() === userId);
    }

    if (!userObj) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const totalProblems = userProblems.length;
    const solvedProblems = userProblems.filter((p) => p.status === 'Solved').length;
    const unsolvedProblems = totalProblems - solvedProblems;
    const completionPercentage =
      totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

    const easySolved = userProblems.filter((p) => p.difficulty === 'Easy' && p.status === 'Solved').length;
    const mediumSolved = userProblems.filter((p) => p.difficulty === 'Medium' && p.status === 'Solved').length;
    const hardSolved = userProblems.filter((p) => p.difficulty === 'Hard' && p.status === 'Solved').length;

    res.json({
      success: true,
      profile: {
        id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        createdAt: userObj.createdAt,
        stats: {
          totalProblems,
          solvedProblems,
          unsolvedProblems,
          completionPercentage,
          easySolved,
          mediumSolved,
          hardSolved
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile name or password
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (req.body.name) {
        user.name = req.body.name.trim();
      }

      if (req.body.password) {
        if (req.body.password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
          });
        }
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          createdAt: updatedUser.createdAt
        }
      });
    } else {
      const user = users.find((u) => u._id.toString() === userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (req.body.name) {
        user.name = req.body.name.trim();
      }

      if (req.body.password) {
        if (req.body.password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
          });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: user._id,
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
  getProfile,
  updateProfile
};

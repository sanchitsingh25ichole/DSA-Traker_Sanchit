const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { users } = require('../config/memoryStore');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'dsa_tracker_super_secret_jwt_key_2026_xyz'
      );

      // Check if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback in-memory
        const found = users.find((u) => u._id.toString() === decoded.id.toString());
        if (found) {
          req.user = {
            _id: found._id,
            name: found.name,
            email: found.email,
            createdAt: found.createdAt
          };
        }
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists or session expired'
        });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed or expired'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no authentication token provided'
    });
  }
};

module.exports = { protect };

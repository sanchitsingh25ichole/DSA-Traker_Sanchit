const mongoose = require('mongoose');
const { Problem, TOPICS } = require('../models/Problem');
const { problems } = require('../config/memoryStore');

// @desc    Get user DSA progress metrics
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    let userProblems = [];

    if (mongoose.connection.readyState === 1) {
      userProblems = await Problem.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    } else {
      userProblems = problems
        .filter((p) => p.userId.toString() === userId)
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    }

    const totalProblems = userProblems.length;
    const solvedProblems = userProblems.filter((p) => p.status === 'Solved').length;
    const unsolvedProblems = totalProblems - solvedProblems;
    const completionPercentage =
      totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

    // Difficulty breakdown
    const easyProblems = userProblems.filter((p) => p.difficulty === 'Easy');
    const mediumProblems = userProblems.filter((p) => p.difficulty === 'Medium');
    const hardProblems = userProblems.filter((p) => p.difficulty === 'Hard');

    const difficultyBreakdown = {
      easy: {
        total: easyProblems.length,
        solved: easyProblems.filter((p) => p.status === 'Solved').length,
        percentage:
          easyProblems.length > 0
            ? Math.round(
                (easyProblems.filter((p) => p.status === 'Solved').length /
                  easyProblems.length) *
                  100
              )
            : 0
      },
      medium: {
        total: mediumProblems.length,
        solved: mediumProblems.filter((p) => p.status === 'Solved').length,
        percentage:
          mediumProblems.length > 0
            ? Math.round(
                (mediumProblems.filter((p) => p.status === 'Solved').length /
                  mediumProblems.length) *
                  100
              )
            : 0
      },
      hard: {
        total: hardProblems.length,
        solved: hardProblems.filter((p) => p.status === 'Solved').length,
        percentage:
          hardProblems.length > 0
            ? Math.round(
                (hardProblems.filter((p) => p.status === 'Solved').length /
                  hardProblems.length) *
                  100
              )
            : 0
      }
    };

    // Topic-wise breakdown for all 16 topics
    const topicBreakdown = TOPICS.map((topicName) => {
      const topicProblems = userProblems.filter((p) => p.topic === topicName);
      const total = topicProblems.length;
      const solved = topicProblems.filter((p) => p.status === 'Solved').length;
      const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

      return {
        topic: topicName,
        total,
        solved,
        unsolved: total - solved,
        percentage
      };
    });

    // Recent activity: top 6 recently updated or created problems
    const recentActivity = userProblems.slice(0, 6).map((p) => ({
      _id: p._id,
      title: p.title,
      topic: p.topic,
      difficulty: p.difficulty,
      status: p.status,
      problemLink: p.problemLink,
      updatedAt: p.updatedAt,
      createdAt: p.createdAt
    }));

    res.json({
      success: true,
      stats: {
        totalProblems,
        solvedProblems,
        unsolvedProblems,
        completionPercentage,
        difficultyBreakdown,
        topicBreakdown,
        recentActivity
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProgress };

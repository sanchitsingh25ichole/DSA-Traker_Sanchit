const mongoose = require('mongoose');
const { Problem, TOPICS } = require('../models/Problem');
const starterProblems = require('../data/starterProblems');
const { problems } = require('../config/memoryStore');

// @desc    Get all problems for the logged-in user
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res, next) => {
  try {
    const { topic, difficulty, status, search, sort } = req.query;
    const userId = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const query = { userId: req.user._id };

      if (topic && topic !== 'All') query.topic = topic;
      if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
      if (status && status !== 'All') query.status = status;
      if (search && search.trim() !== '') {
        query.title = { $regex: search.trim(), $options: 'i' };
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'oldest') sortOption = { createdAt: 1 };
      else if (sort === 'title-asc') sortOption = { title: 1 };
      else if (sort === 'title-desc') sortOption = { title: -1 };
      else if (sort === 'difficulty') sortOption = { difficulty: 1, createdAt: -1 };

      const userProblems = await Problem.find(query).sort(sortOption);

      return res.json({
        success: true,
        count: userProblems.length,
        problems: userProblems
      });
    } else {
      // In-memory fallback
      let filtered = problems.filter((p) => p.userId.toString() === userId);

      if (topic && topic !== 'All') {
        filtered = filtered.filter((p) => p.topic === topic);
      }
      if (difficulty && difficulty !== 'All') {
        filtered = filtered.filter((p) => p.difficulty === difficulty);
      }
      if (status && status !== 'All') {
        filtered = filtered.filter((p) => p.status === status);
      }
      if (search && search.trim() !== '') {
        const queryTerm = search.trim().toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(queryTerm));
      }

      // Sorting
      if (sort === 'oldest') {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sort === 'title-asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === 'title-desc') {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
      } else if (sort === 'difficulty') {
        const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
        filtered.sort((a, b) => (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0));
      } else {
        // default newest
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return res.json({
        success: true,
        count: filtered.length,
        problems: filtered
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single problem by ID
// @route   GET /api/problems/:id
// @access  Private
const getProblemById = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const problem = await Problem.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      return res.json({ success: true, problem });
    } else {
      const problem = problems.find(
        (p) => p._id.toString() === req.params.id && p.userId.toString() === userId
      );

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      return res.json({ success: true, problem });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new problem
// @route   POST /api/problems
// @access  Private
const createProblem = async (req, res, next) => {
  try {
    const { title, topic, difficulty, problemLink, status, notes } = req.body;

    if (!title || !topic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, topic, and difficulty'
      });
    }

    if (!TOPICS.includes(topic)) {
      return res.status(400).json({
        success: false,
        message: `Invalid topic. Must be one of: ${TOPICS.join(', ')}`
      });
    }

    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid difficulty. Must be Easy, Medium, or Hard'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const problem = await Problem.create({
        userId: req.user._id,
        title: title.trim(),
        topic,
        difficulty,
        problemLink: problemLink ? problemLink.trim() : '',
        status: status === 'Solved' ? 'Solved' : 'Unsolved',
        notes: notes ? notes.trim() : ''
      });

      return res.status(201).json({ success: true, problem });
    } else {
      const newProblem = {
        _id: new mongoose.Types.ObjectId().toString(),
        userId: req.user._id.toString(),
        title: title.trim(),
        topic,
        difficulty,
        problemLink: problemLink ? problemLink.trim() : '',
        status: status === 'Solved' ? 'Solved' : 'Unsolved',
        notes: notes ? notes.trim() : '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      problems.unshift(newProblem);

      return res.status(201).json({ success: true, problem: newProblem });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a problem
// @route   PUT /api/problems/:id
// @access  Private
const updateProblem = async (req, res, next) => {
  try {
    const { title, topic, difficulty, problemLink, status, notes } = req.body;
    const userId = req.user._id.toString();

    if (topic && !TOPICS.includes(topic)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid topic provided'
      });
    }

    if (difficulty && !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid difficulty provided'
      });
    }

    if (mongoose.connection.readyState === 1) {
      let problem = await Problem.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      problem.title = title !== undefined ? title.trim() : problem.title;
      problem.topic = topic !== undefined ? topic : problem.topic;
      problem.difficulty = difficulty !== undefined ? difficulty : problem.difficulty;
      problem.problemLink = problemLink !== undefined ? problemLink.trim() : problem.problemLink;
      problem.status = status !== undefined ? (status === 'Solved' ? 'Solved' : 'Unsolved') : problem.status;
      problem.notes = notes !== undefined ? notes.trim() : problem.notes;
      problem.updatedAt = Date.now();

      const updatedProblem = await problem.save();
      return res.json({ success: true, problem: updatedProblem });
    } else {
      const index = problems.findIndex(
        (p) => p._id.toString() === req.params.id && p.userId.toString() === userId
      );

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      problems[index] = {
        ...problems[index],
        title: title !== undefined ? title.trim() : problems[index].title,
        topic: topic !== undefined ? topic : problems[index].topic,
        difficulty: difficulty !== undefined ? difficulty : problems[index].difficulty,
        problemLink: problemLink !== undefined ? problemLink.trim() : problems[index].problemLink,
        status: status !== undefined ? (status === 'Solved' ? 'Solved' : 'Unsolved') : problems[index].status,
        notes: notes !== undefined ? notes.trim() : problems[index].notes,
        updatedAt: new Date()
      };

      return res.json({ success: true, problem: problems[index] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Quick toggle problem status between Solved and Unsolved
// @route   PATCH /api/problems/:id/toggle
// @access  Private
const toggleProblemStatus = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const problem = await Problem.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      problem.status = problem.status === 'Solved' ? 'Unsolved' : 'Solved';
      problem.updatedAt = Date.now();
      const updatedProblem = await problem.save();

      return res.json({ success: true, problem: updatedProblem });
    } else {
      const problem = problems.find(
        (p) => p._id.toString() === req.params.id && p.userId.toString() === userId
      );

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      problem.status = problem.status === 'Solved' ? 'Unsolved' : 'Solved';
      problem.updatedAt = new Date();

      return res.json({ success: true, problem });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a problem
// @route   DELETE /api/problems/:id
// @access  Private
const deleteProblem = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const problem = await Problem.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      return res.json({
        success: true,
        message: 'Problem successfully deleted',
        id: req.params.id
      });
    } else {
      const index = problems.findIndex(
        (p) => p._id.toString() === req.params.id && p.userId.toString() === userId
      );

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found or unauthorized'
        });
      }

      problems.splice(index, 1);

      return res.json({
        success: true,
        message: 'Problem successfully deleted',
        id: req.params.id
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Seed starter problems
// @route   POST /api/problems/seed
// @access  Private
const seedStarterProblems = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const userStarters = starterProblems.map((prob) => ({
        ...prob,
        userId: req.user._id
      }));

      const inserted = await Problem.insertMany(userStarters);
      return res.status(201).json({
        success: true,
        message: `Successfully added ${inserted.length} starter problems`,
        count: inserted.length
      });
    } else {
      const newItems = starterProblems.map((prob) => ({
        _id: new mongoose.Types.ObjectId().toString(),
        userId,
        title: prob.title,
        topic: prob.topic,
        difficulty: prob.difficulty,
        problemLink: prob.problemLink,
        status: prob.status,
        notes: prob.notes,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      problems.push(...newItems);

      return res.status(201).json({
        success: true,
        message: `Successfully added ${newItems.length} starter problems`,
        count: newItems.length
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  toggleProblemStatus,
  deleteProblem,
  seedStarterProblems
};

const bcrypt = require('bcryptjs');
const starterProblems = require('../data/starterProblems');

// In-memory data structures
const users = [];
const problems = [];

// Seed an initial demo user for quick testing if in memory mode
const initDemoUser = async () => {
  if (users.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    const demoUser = {
      _id: '64a1b2c3d4e5f6a7b8c9d001',
      name: 'Demo Student',
      email: 'demo@dsa.com',
      password: hashedPassword,
      createdAt: new Date()
    };
    users.push(demoUser);

    // Seed starter problems for demo user
    starterProblems.forEach((prob, idx) => {
      problems.push({
        _id: `64a1b2c3d4e5f6a7b8c9d10${idx + 1}`,
        userId: demoUser._id,
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
  }
};

initDemoUser();

module.exports = {
  users,
  problems
};

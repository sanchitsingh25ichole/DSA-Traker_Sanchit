const mongoose = require('mongoose');

const TOPICS = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stack',
  'Queue',
  'Binary Search',
  'Sorting',
  'Recursion',
  'Trees',
  'Binary Search Trees',
  'Graphs',
  'Dynamic Programming',
  'Greedy Algorithms',
  'Backtracking',
  'Bit Manipulation',
  'Heap'
];

const problemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a problem title'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  topic: {
    type: String,
    required: [true, 'Please select a DSA topic'],
    enum: {
      values: TOPICS,
      message: '{VALUE} is not a supported DSA topic'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Please select a difficulty level'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    }
  },
  problemLink: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['Solved', 'Unsolved'],
    default: 'Unsolved'
  },
  notes: {
    type: String,
    default: '',
    maxlength: [2000, 'Notes cannot exceed 2000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
problemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = {
  Problem: mongoose.model('Problem', problemSchema),
  TOPICS
};

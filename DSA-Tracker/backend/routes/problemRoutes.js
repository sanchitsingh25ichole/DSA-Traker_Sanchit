const express = require('express');
const router = express.Router();
const {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  toggleProblemStatus,
  deleteProblem,
  seedStarterProblems
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

// All problem routes are protected with JWT
router.use(protect);

router.route('/')
  .get(getProblems)
  .post(createProblem);

router.post('/seed', seedStarterProblems);

router.route('/:id')
  .get(getProblemById)
  .put(updateProblem)
  .delete(deleteProblem);

router.patch('/:id/toggle', toggleProblemStatus);

module.exports = router;

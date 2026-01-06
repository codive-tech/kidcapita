const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/programs/public
// @desc    Get all active add-on programs (for Extra Programs page)
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const programs = await Program.find({ active: true, isAddOn: true });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/programs
// @desc    Get all programs (admin)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/programs
// @desc    Create new program
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/programs/:id
// @desc    Update program
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


const express = require('express');
const router = express.Router();
const Level = require('../models/Level');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/levels/public
// @desc    Get all active levels with curriculum (for Curriculum page)
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const levels = await Level.find({ active: true }).sort({ slug: 1 });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/levels
// @desc    Get all levels (admin)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const levels = await Level.find().sort({ slug: 1 });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/levels/:id
// @desc    Get single level
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/levels
// @desc    Create new level (for future curriculum updates)
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const level = await Level.create(req.body);
    res.status(201).json(level);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/levels/:id
// @desc    Update level
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const level = await Level.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.json(level);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/levels/:id
// @desc    Delete level
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const level = await Level.findByIdAndDelete(req.params.id);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.json({ message: 'Level removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


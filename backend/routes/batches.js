const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const Student = require('../models/Student');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/batches
// @desc    Get all batches
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const batches = await Batch.find()
      .populate('level', 'name ageRange')
      .populate('students', 'firstName lastName age parentEmail')
      .sort({ year: -1, month: -1 });
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/batches
// @desc    Create new batch
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      level,
      month,
      year,
      startDate,
      dayOfWeek,
      timeSlot,
      minStudents,
      maxStudents
    } = req.body;

    const batch = await Batch.create({
      level,
      month,
      year,
      startDate,
      dayOfWeek,
      timeSlot,
      minStudents: minStudents || 5,
      maxStudents: maxStudents || 10,
      students: [],
      status: 'forming'
    });

    const populatedBatch = await Batch.findById(batch._id).populate('level');
    res.status(201).json(populatedBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/batches/:id/assign-students
// @desc    Assign pending students to batch
// @access  Private/Admin
router.put('/:id/assign-students', protect, admin, async (req, res) => {
  try {
    const { studentIds } = req.body;
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Check if batch is full
    if (batch.students.length + studentIds.length > batch.maxStudents) {
      return res.status(400).json({ 
        message: `Cannot add students. Batch capacity: ${batch.maxStudents}` 
      });
    }

    // Add students to batch
    batch.students.push(...studentIds);

    // Update students' batch and status
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { 
        batch: batch._id,
        status: 'active'
      }
    );

    // Update batch status if minimum met
    if (batch.students.length >= batch.minStudents) {
      batch.status = 'active';
    }

    await batch.save();

    const updatedBatch = await Batch.findById(batch._id)
      .populate('level')
      .populate('students');

    res.json(updatedBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/batches/:id
// @desc    Update batch
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('level')
      .populate('students');

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.json(batch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


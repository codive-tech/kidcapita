const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Level = require('../models/Level');
const { protect, admin, instructorOrAdmin } = require('../middleware/auth');

// @route   GET /api/students
// @desc    Get all students
// @access  Private/Admin/Instructor
router.get('/', protect, instructorOrAdmin, async (req, res) => {
  try {
    const students = await Student.find()
      .populate('level', 'name ageRange')
      .populate('extraPrograms', 'name')
      .populate('batch', 'month year startDate')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/students
// @desc    Create new student
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      parentEmail,
      parentPhone,
      level,
      extraPrograms,
      joinedMonth,
      joinedYear
    } = req.body;

    // If level not provided, infer from age
    let levelId = level;
    if (!levelId) {
      let levelSlug;
      if (age >= 5 && age <= 8) {
        levelSlug = 'level-1';
      } else if (age >= 9 && age <= 13) {
        levelSlug = 'level-2';
      } else if (age >= 13 && age <= 15) {
        levelSlug = 'level-3';
      }
      
      const inferredLevel = await Level.findOne({ slug: levelSlug });
      if (!inferredLevel) {
        return res.status(400).json({ message: 'Could not determine appropriate level' });
      }
      levelId = inferredLevel._id;
    }

    const student = await Student.create({
      firstName,
      lastName,
      age,
      parentEmail,
      parentPhone,
      level: levelId,
      extraPrograms: extraPrograms || [],
      joinedMonth: joinedMonth || new Date().getMonth() + 1,
      joinedYear: joinedYear || new Date().getFullYear(),
      status: 'pending'
    });

    const populatedStudent = await Student.findById(student._id)
      .populate('level')
      .populate('extraPrograms');

    res.status(201).json(populatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('level')
      .populate('extraPrograms')
      .populate('batch');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


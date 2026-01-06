const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 5,
    max: 15
  },
  parentEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  parentPhone: {
    type: String
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  },
  extraPrograms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program'
  }],
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch'
  },
  joinedMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  joinedYear: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Method to infer level from age
studentSchema.methods.inferLevel = function() {
  if (this.age >= 5 && this.age <= 8) {
    return 'level-1';
  } else if (this.age >= 9 && this.age <= 13) {
    return 'level-2';
  } else if (this.age >= 13 && this.age <= 15) {
    return 'level-3';
  }
  return null;
};

module.exports = mongoose.model('Student', studentSchema);


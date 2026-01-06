const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  timeSlot: {
    type: String
  },
  minStudents: {
    type: Number,
    default: 5
  },
  maxStudents: {
    type: Number,
    default: 10
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  status: {
    type: String,
    enum: ['forming', 'active', 'completed', 'cancelled'],
    default: 'forming'
  }
}, {
  timestamps: true
});

// Virtual for checking if batch is full
batchSchema.virtual('isFull').get(function() {
  return this.students.length >= this.maxStudents;
});

// Virtual for checking if batch can start
batchSchema.virtual('canStart').get(function() {
  return this.students.length >= this.minStudents;
});

batchSchema.set('toJSON', { virtuals: true });
batchSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Batch', batchSchema);


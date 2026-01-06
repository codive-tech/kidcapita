const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true
  },
  parentEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  parentPhone: {
    type: String
  },
  childName: {
    type: String,
    required: true
  },
  childAge: {
    type: Number,
    required: true,
    min: 5,
    max: 15
  },
  chosenLevel: {
    type: String,
    required: true
  },
  chosenAddOns: [{
    type: String
  }],
  preferredMonth: {
    type: String
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'enrolled', 'cancelled'],
    default: 'new'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);


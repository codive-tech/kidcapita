const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  classFocus: [{
    type: String
  }],
  sampleActivity: {
    type: String
  },
  keyOutcome: {
    type: String
  }
});

const levelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  ageRange: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  totalClasses: {
    type: Number,
    default: 50
  },
  units: [unitSchema],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Level', levelSchema);


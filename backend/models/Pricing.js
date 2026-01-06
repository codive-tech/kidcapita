const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['level', 'program'],
    required: true
  },
  itemRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'itemType',
    required: true
  },
  priceINR: {
    type: Number,
    required: true
  },
  priceBHD: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);


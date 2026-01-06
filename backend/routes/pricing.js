const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');
const Level = require('../models/Level');
const Program = require('../models/Program');

// @route   GET /api/pricing
// @desc    Get all pricing (INR + BHD) for Pricing page
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pricing = await Pricing.find({ isActive: true })
      .populate('itemRef');
    
    // Format response for frontend
    const formattedPricing = {
      levels: [],
      programs: []
    };

    for (const price of pricing) {
      if (price.itemType === 'level') {
        formattedPricing.levels.push({
          _id: price._id,
          name: price.itemRef.name,
          slug: price.itemRef.slug,
          ageRange: price.itemRef.ageRange,
          totalClasses: price.itemRef.totalClasses,
          priceINR: price.priceINR,
          priceBHD: price.priceBHD
        });
      } else if (price.itemType === 'program') {
        formattedPricing.programs.push({
          _id: price._id,
          name: price.itemRef.name,
          slug: price.itemRef.slug,
          description: price.itemRef.description,
          priceINR: price.priceINR,
          priceBHD: price.priceBHD
        });
      }
    }

    res.json(formattedPricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


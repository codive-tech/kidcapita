const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/auth');
const { sendEmail, emailTemplates } = require('../config/email');

// @route   POST /api/bookings
// @desc    Create new booking (from Book a Demo page)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      parentName,
      parentEmail,
      parentPhone,
      childName,
      childAge,
      chosenLevel,
      chosenAddOns,
      preferredMonth,
      message
    } = req.body;

    const booking = await Booking.create({
      parentName,
      parentEmail,
      parentPhone,
      childName,
      childAge,
      chosenLevel,
      chosenAddOns: chosenAddOns || [],
      preferredMonth,
      message,
      status: 'new'
    });

    // Send confirmation email to customer
    const customerEmail = emailTemplates.bookingConfirmationCustomer(booking);
    await sendEmail({
      to: parentEmail,
      subject: customerEmail.subject,
      text: customerEmail.text,
      html: customerEmail.html,
    });

    // Send notification email to admin
    const adminEmail = emailTemplates.bookingNotificationAdmin(booking);
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@kidcapita.com',
      subject: adminEmail.subject,
      text: adminEmail.text,
      html: adminEmail.html,
    });

    console.log('✅ Booking created and emails sent');

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully! Check your email for confirmation.',
      booking
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


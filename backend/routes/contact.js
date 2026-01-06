const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect, admin } = require('../middleware/auth');
const { sendEmail, emailTemplates } = require('../config/email');

// @route   POST /api/contact
// @desc    Submit contact form (from Contact page)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new'
    });

    // Send auto-reply to customer
    const autoReply = emailTemplates.contactAutoReply(contactMessage);
    await sendEmail({
      to: email,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });

    // Send notification to admin
    const adminNotification = emailTemplates.contactNotificationAdmin(contactMessage);
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@kidcapita.com',
      subject: adminNotification.subject,
      text: adminNotification.text,
      html: adminNotification.html,
    });

    console.log('✅ Contact message created and emails sent');

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! Check your email for confirmation.',
      contactMessage
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact message status
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


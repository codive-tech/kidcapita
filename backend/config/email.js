const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Check if email is configured
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
    console.log('⚠️  Email not configured. Set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in .env');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email helper function
const sendEmail = async (options) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('📧 Email would be sent to:', options.to);
    console.log('📧 Subject:', options.subject);
    return { success: false, message: 'Email not configured' };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"KidCapita" <noreply@kidcapita.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return { success: false, error: error.message };
  }
};

// Email templates
const emailTemplates = {
  // Demo booking confirmation to customer
  bookingConfirmationCustomer: (booking) => ({
    subject: '🎓 Demo Booking Confirmed - KidCapita',
    text: `
Hello ${booking.parentName},

Thank you for booking a demo with KidCapita! We're excited to help ${booking.childName} start their financial literacy journey.

Booking Details:
- Child's Name: ${booking.childName}
- Age: ${booking.childAge} years
- Level: ${booking.chosenLevel}
- Preferred Month: ${booking.preferredMonth || 'No preference'}
${booking.chosenAddOns && booking.chosenAddOns.length > 0 ? `- Add-ons: ${booking.chosenAddOns.join(', ')}` : ''}

What's Next?
Our team will contact you within 24 hours at ${booking.parentEmail}${booking.parentPhone ? ` or ${booking.parentPhone}` : ''} to schedule your free demo class.

Questions? Reply to this email or contact us at support@kidcapita.com

Best regards,
The KidCapita Team
Money Smarts for the Next Generation

---
KidCapita
Website: https://kidcapita.com
Email: info@kidcapita.com
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: #D4AF37; padding: 30px; text-align: center; }
    .content { background: #F8F8F5; padding: 30px; }
    .details { background: white; padding: 20px; border-left: 4px solid #D4AF37; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    .btn { display: inline-block; background: #D4AF37; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎓 KidCapita</h1>
      <p style="color: #C0C0C0;">Demo Booking Confirmed!</p>
    </div>
    
    <div class="content">
      <h2>Hello ${booking.parentName}!</h2>
      <p>Thank you for booking a demo with KidCapita! We're excited to help <strong>${booking.childName}</strong> start their financial literacy journey.</p>
      
      <div class="details">
        <h3>📋 Booking Details</h3>
        <ul>
          <li><strong>Child's Name:</strong> ${booking.childName}</li>
          <li><strong>Age:</strong> ${booking.childAge} years</li>
          <li><strong>Level:</strong> ${booking.chosenLevel}</li>
          <li><strong>Preferred Month:</strong> ${booking.preferredMonth || 'No preference'}</li>
          ${booking.chosenAddOns && booking.chosenAddOns.length > 0 ? `<li><strong>Add-ons:</strong> ${booking.chosenAddOns.join(', ')}</li>` : ''}
        </ul>
      </div>
      
      <h3>✨ What's Next?</h3>
      <p>Our team will contact you within <strong>24 hours</strong> at:</p>
      <ul>
        <li>📧 ${booking.parentEmail}</li>
        ${booking.parentPhone ? `<li>📞 ${booking.parentPhone}</li>` : ''}
      </ul>
      
      <p style="text-align: center;">
        <a href="https://kidcapita.com/curriculum" class="btn">View Our Curriculum</a>
      </p>
      
      <p>Questions? Reply to this email or contact us at <a href="mailto:support@kidcapita.com">support@kidcapita.com</a></p>
    </div>
    
    <div class="footer">
      <p><strong>KidCapita</strong> - Money Smarts for the Next Generation</p>
      <p>Website: <a href="https://kidcapita.com">kidcapita.com</a> | Email: info@kidcapita.com</p>
    </div>
  </div>
</body>
</html>
    `,
  }),

  // Demo booking notification to admin
  bookingNotificationAdmin: (booking) => ({
    subject: '🔔 New Demo Booking - KidCapita',
    text: `
New Demo Booking Received!

Parent Details:
- Name: ${booking.parentName}
- Email: ${booking.parentEmail}
- Phone: ${booking.parentPhone || 'Not provided'}

Child Details:
- Name: ${booking.childName}
- Age: ${booking.childAge} years
- Level: ${booking.chosenLevel}

Preferences:
- Start Month: ${booking.preferredMonth || 'No preference'}
- Add-ons: ${booking.chosenAddOns && booking.chosenAddOns.length > 0 ? booking.chosenAddOns.join(', ') : 'None'}

Message:
${booking.message || 'No additional message'}

Booking ID: ${booking._id}
Submitted: ${new Date(booking.createdAt).toLocaleString()}

Action Required: Contact the parent within 24 hours to schedule the demo.

View in admin dashboard: http://localhost:5000/admin
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4; }
    .header { background: #000; color: #D4AF37; padding: 20px; text-align: center; }
    .content { background: white; padding: 20px; }
    .section { margin: 20px 0; padding: 15px; background: #F8F8F5; border-left: 4px solid #D4AF37; }
    .label { font-weight: bold; color: #D4AF37; }
    .btn { display: inline-block; background: #D4AF37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🔔 New Demo Booking</h2>
    </div>
    
    <div class="content">
      <div class="section">
        <h3>👨‍👩‍👧 Parent Details</h3>
        <p><span class="label">Name:</span> ${booking.parentName}</p>
        <p><span class="label">Email:</span> ${booking.parentEmail}</p>
        <p><span class="label">Phone:</span> ${booking.parentPhone || 'Not provided'}</p>
      </div>
      
      <div class="section">
        <h3>👶 Child Details</h3>
        <p><span class="label">Name:</span> ${booking.childName}</p>
        <p><span class="label">Age:</span> ${booking.childAge} years</p>
        <p><span class="label">Level:</span> ${booking.chosenLevel}</p>
      </div>
      
      <div class="section">
        <h3>📅 Preferences</h3>
        <p><span class="label">Start Month:</span> ${booking.preferredMonth || 'No preference'}</p>
        <p><span class="label">Add-ons:</span> ${booking.chosenAddOns && booking.chosenAddOns.length > 0 ? booking.chosenAddOns.join(', ') : 'None'}</p>
      </div>
      
      ${booking.message ? `
      <div class="section">
        <h3>💬 Message</h3>
        <p>${booking.message}</p>
      </div>
      ` : ''}
      
      <div class="section">
        <p><span class="label">Booking ID:</span> ${booking._id}</p>
        <p><span class="label">Submitted:</span> ${new Date(booking.createdAt).toLocaleString()}</p>
      </div>
      
      <p style="text-align: center; margin-top: 20px;">
        <a href="http://localhost:3000/admin" class="btn">View in Admin Dashboard</a>
      </p>
      
      <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;">
        ⚠️ <strong>Action Required:</strong> Contact the parent within 24 hours to schedule the demo.
      </p>
    </div>
  </div>
</body>
</html>
    `,
  }),

  // Contact form notification to admin
  contactNotificationAdmin: (contact) => ({
    subject: `📬 New Contact Message: ${contact.subject}`,
    text: `
New Contact Form Submission

From: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone || 'Not provided'}
Subject: ${contact.subject}

Message:
${contact.message}

Submitted: ${new Date(contact.createdAt).toLocaleString()}
Contact ID: ${contact._id}

View in admin dashboard: http://localhost:5000/admin
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4; }
    .header { background: #000; color: #D4AF37; padding: 20px; }
    .content { background: white; padding: 20px; }
    .section { margin: 15px 0; padding: 15px; background: #F8F8F5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📬 New Contact Message</h2>
    </div>
    <div class="content">
      <div class="section">
        <p><strong>From:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
      </div>
      <div class="section">
        <h3>Message:</h3>
        <p>${contact.message}</p>
      </div>
      <p><small>Submitted: ${new Date(contact.createdAt).toLocaleString()}</small></p>
    </div>
  </div>
</body>
</html>
    `,
  }),

  // Contact form auto-reply to customer
  contactAutoReply: (contact) => ({
    subject: '✅ We received your message - KidCapita',
    text: `
Hello ${contact.name},

Thank you for contacting KidCapita! We've received your message and our team will get back to you within 24-48 hours.

Your Message:
${contact.message}

In the meantime, feel free to explore our website:
- View Curriculum: https://kidcapita.com/curriculum
- Check Pricing: https://kidcapita.com/pricing
- Book a Demo: https://kidcapita.com/book-demo

Best regards,
The KidCapita Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #D4AF37; padding: 20px; text-align: center; }
    .content { background: #F8F8F5; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>✅ Message Received</h2>
    </div>
    <div class="content">
      <p>Hello ${contact.name},</p>
      <p>Thank you for contacting KidCapita! We've received your message and our team will get back to you within <strong>24-48 hours</strong>.</p>
      <div style="background: white; padding: 15px; margin: 20px 0; border-left: 4px solid #D4AF37;">
        <p><strong>Your Message:</strong></p>
        <p>${contact.message}</p>
      </div>
      <p>In the meantime, explore our website:</p>
      <ul>
        <li><a href="https://kidcapita.com/curriculum">View Curriculum</a></li>
        <li><a href="https://kidcapita.com/pricing">Check Pricing</a></li>
        <li><a href="https://kidcapita.com/book-demo">Book a Demo</a></li>
      </ul>
      <p>Best regards,<br><strong>The KidCapita Team</strong></p>
    </div>
  </div>
</body>
</html>
    `,
  }),
};

module.exports = {
  sendEmail,
  emailTemplates,
};


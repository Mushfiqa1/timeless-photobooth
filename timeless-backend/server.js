const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // Moved to top
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. Rate Limiting: Apply this BEFORE the routes
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 5 requests per hour
  message: { error: 'Too many requests from this IP, please try again after an hour' }
});

// Apply the limiter to the contact route
app.use('/api/contact', limiter);

// 2. Configure Email Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Helps prevent connection timeouts on cloud hosts
  }
});

// 3. Contact Route
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, phone, services, date, message } = req.body;

  // Basic Backend Validation
  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Quote Request: ${firstName} ${lastName}`,
    html: `
      <div style="font-family: serif; color: #5D4037; padding: 20px;">
        <h2 style="border-bottom: 1px solid #D7C4B7; padding-bottom: 10px;">New Inquiry: Timeless Photo Booth TO</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Event Date:</strong> ${date}</p>
        <p><strong>Services:</strong> ${services.join(', ')}</p>
        <p style="background: #FAF9F6; padding: 15px; border-radius: 8px;"><strong>Vision:</strong><br/>${message}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Mail Error:', error);
      res.status(500).json({ error: 'Error sending email. Please try again later.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Success' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
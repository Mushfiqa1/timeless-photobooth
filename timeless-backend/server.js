const express = require('express');
const { Resend } = require('resend'); // Updated import
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend

app.use(express.json());
app.use(cors());

// Rate Limiting (Higher limit for testing)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/contact', limiter);

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, services, date, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default testing email
      to: 'timelessphotoboothto@gmail.com', // Your actual inbox
      subject: `New Inquiry: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; color: #5D4037;">
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Services:</strong> ${services.join(', ')}</p>
          <p><strong>Vision:</strong> ${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error });
    }

    res.status(200).json({ message: 'Success', id: data.id });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
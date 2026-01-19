const express = require('express');
const { Resend } = require('resend'); 
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

// 1. UPDATED CORS: Explicitly allow your Vercel URL to stop the "Access-Control" error
app.use(cors({
  origin: ["https://timeless-photobooth.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));

// 2. Rate Limiting: High limit for testing to prevent 429 errors
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Increased to 100 to ensure you aren't blocked during setup
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/contact', limiter);

// 3. Contact Route using Resend API
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, services, date, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use this while on Resend's free/testing tier
      to: 'timelessphotoboothto@gmail.com', // Where you want to receive the leads
      subject: `New Inquiry: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; color: #5D4037; padding: 20px; border: 1px solid #D7C4B7;">
          <h2 style="color: #818C78;">New Quote Request: Timeless Photo Booth TO</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Event Date:</strong> ${date}</p>
          <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services}</p>
          <hr style="border: 0; border-top: 1px solid #D7C4B7;" />
          <p><strong>Vision/Message:</strong></p>
          <p style="background: #FAF9F6; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: 'Failed to send email via Resend' });
    }

    res.status(200).json({ message: 'Success', id: data.id });
  } catch (err) {
    console.error('Server Internal Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 4. UPDATED PORT BINDING: Required for Render to see your app
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is live and listening on port ${PORT}`);
});
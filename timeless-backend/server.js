const express = require('express');
const { Resend } = require('resend'); 
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// 1. TRUST PROXY: Essential for Render/Vercel to get the correct client IP
// This prevents the 'ERR_ERL_UNEXPECTED_X_FORWARDED_FOR' error you saw
app.set('trust proxy', 1); 

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

// 2. UPDATED CORS: Explicitly allow your live frontend
app.use(cors({
  origin: ["https://timeless-photobooth.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));

// 3. Rate Limiting: Configured to trust the Render proxy
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 100, 
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true, // Returns rate limit info in headers
  legacyHeaders: false,
});
app.use('/api/contact', limiter);

// 4. Contact Route
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, services, date, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default testing email
      // IMPORTANT: 'to' MUST be the email you used to sign up for Resend
      to: 'timelessphotoboothto@gmail.com', 
      subject: `New Inquiry: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; color: #5D4037; padding: 20px; border: 1px solid #D7C4B7;">
          <h2 style="color: #818C78;">New Quote Request</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Event Date:</strong> ${date}</p>
          <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services}</p>
          <hr style="border: 0; border-top: 1px solid #D7C4B7;" />
          <p><strong>Message:</strong></p>
          <p style="background: #FAF9F6; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      // Return specific error to help you debug
      return res.status(403).json({ error: error.message });
    }

    res.status(200).json({ message: 'Success', id: data.id });
  } catch (err) {
    console.error('Server Internal Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 5. PRODUCTION PORT BINDING: Use 0.0.0.0 for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is live and listening on port ${PORT}`);
});
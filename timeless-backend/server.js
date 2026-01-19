const express = require('express');
const { Resend } = require('resend'); 
const cors = require('cors');
const app = express();
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors({ origin: "https://timeless-photobooth.vercel.app" })); // Tight security

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default for free plan
      to: 'timelessphotoboothto@gmail.com', // Must match your NEW Resend account email
      replyTo: email, // This allows you to reply directly to the customer!
      subject: `New Inquiry from ${firstName}`,
      html: `
        <h3>New Quote Request</h3>
        <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
        <p><strong>Customer Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) return res.status(403).json({ error: error.message });
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Error' });
  }
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
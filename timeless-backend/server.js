const express = require('express');
const { Resend } = require('resend'); 
const cors = require('cors');
const app = express();
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors({ origin: "https://timeless-photobooth.vercel.app" })); 

app.post('/api/contact', async (req, res) => {
  // 1. Added phone and date to the destructuring list
  const { firstName, lastName, email, phone, date, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Timeless Booth <onboarding@resend.dev>', 
      to: 'timelessphotoboothto@gmail.com', 
      replyTo: email, 
      subject: `New Inquiry from ${firstName} ${lastName}`,
      // 2. Updated the HTML template to include the new data fields
      html: `
        <div style="font-family: sans-serif; color: #5D4037; line-height: 1.6;">
          <h2 style="border-bottom: 1px solid #D7C4B7; padding-bottom: 10px;">New Quote Request</h2>
          <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Event Date:</strong> ${date || 'TBD'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Vision & Selected Services:</strong></p>
          <p style="background: #FAF9F6; padding: 15px; border-radius: 8px; border: 1px solid #E0DED7;">
            ${message}
          </p>
        </div>
      `,
    });

    if (error) return res.status(403).json({ error: error.message });
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: 'Internal Error' });
  }
});

app.listen(process.env.PORT || 10000, '0.0.0.0', () => {
  console.log(`Server is live and listening on port ${process.env.PORT || 10000}`);
});
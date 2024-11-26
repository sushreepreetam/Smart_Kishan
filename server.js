require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const Twilio = require('twilio');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

// MongoDB configuration
const mongoUri = process.env.MONGO_URI;
const dbName = 'otpDatabase';
let db;

MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// API endpoints
app.post('/api/sendOtp', async (req, res) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  try {
    // Save OTP to MongoDB
    await db.collection('otps').insertOne({ mobileNumber, otp, createdAt: new Date() });

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.post('/api/verifyOtp', async (req, res) => {
  const { mobileNumber, otp } = req.body;
  if (!mobileNumber || !otp) {
    return res.status(400).json({ error: 'Mobile number and OTP are required' });
  }

  try {
    // Verify OTP from MongoDB
    const otpRecord = await db.collection('otps').findOne({ mobileNumber, otp });
    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired (e.g., valid for 10 minutes)
    const otpExpiry = new Date(otpRecord.createdAt).getTime() + 10 * 60 * 1000;
    if (Date.now() > otpExpiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    res.status(200).json({ success: true, userData: { mobileNumber } });
  } catch (error) {
    console.error('Error verifying OTP', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

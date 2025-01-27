// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize Twilio client
const twilioClient = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/send-sms', async (req, res) => {
    const { phoneNumber, message } = req.body;
    
    try {
        const twilioMessage = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+919623160472'
        });
        
        res.json({ 
            success: true, 
            message: 'SMS sent successfully!',
            messageId: twilioMessage.sid 
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send SMS',
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
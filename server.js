const express = require('express');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3001;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendReminder = () => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject: "Time to Code!",
        text: "It's time for your daily 1-hour code session. Let's stick to it. We can build something great!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Reminder email sent:', info.response);
        }
    });
};

schedule.scheduleJob('0 9 * * *', () => {
    sendReminder();
    console.log('Scheduled task executed: Reminder email sent');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

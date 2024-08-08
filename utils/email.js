const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'marishwaran777@gmail.com', // Your SMTP server
  port: 587, // Common port for SMTP
  secure: false, // Use true for port 465, false for other ports
  auth: {
    user: 'marishwaran777@gmail.com', // Your email
    pass: 'ogbi ffqh itms qfxo' // Your email password
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@example.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return;
    }
    console.log('Email sent:', info.response);
  });
};

module.exports = { sendEmail };

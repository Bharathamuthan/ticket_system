const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service you are using
    auth: {
        user: 'marishwaran777@gmail.com',
        pass: 'ogbi ffqh itms qfxo'
    }
});

// Setup email data
const mailOptions = {
    from: 'your-email@gmail.com', // sender address
    to: 'marishwaran777@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    text: 'Hello world', // plain text body
    html: '<b>Hello world</b>' // html body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`Error sending email: ${error.message}`);
    }
    console.log('Email sent: ' + info.response);
});

const Joi = require('joi');
const request = require('request');

// Validation schema for email data
const emailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  html: Joi.string().required(),
});

// Function to send email
const requestEmail = (emailData, callback) => {
  // Validate email data
  const { error } = emailSchema.validate(emailData);
  if (error) {
    return callback(error);
  }

  request.post({
    url: 'http://localhost:5000/api/auth/request',
    body: emailData,
    json: true,
  }, (error, response, body) => {
    if (error) {
      console.error('Request error:', error);
      return callback(error);
    }

    if (response.statusCode !== 200) {
      console.error('Response status code error:', response.statusCode);
      return callback(new Error('Email sending failed'));
    }

    callback(null, body);
  });
};

module.exports = { emailSchema, requestEmail };

const Joi = require('joi');

const projectValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(), 
});

module.exports = projectValidation;

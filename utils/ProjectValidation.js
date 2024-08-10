const Joi = require('joi');

const projectValidation = Joi.object({
  projectresources: Joi.string().required(),
  todo: Joi.string().required(),
  qa: Joi.string().required(),
  bugs: Joi.string().required(),
  done: Joi.string().required(),
  created_by: Joi.string().required(),
  modify_by: Joi.string().required(), 
});

module.exports = projectValidation;

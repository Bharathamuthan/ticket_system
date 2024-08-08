const Joi = require('joi');

const projectschema = Joi.object({
  projectresources: Joi.string().required(),
  todo: Joi.string().required(),
  qa: Joi.string().required(),
  bugs: Joi.string().required(),
  done: Joi.string().required(),
  created_by: Joi.string().required(),
  modify_by: Joi.string().required(), 
});

module.exports = projectschema;

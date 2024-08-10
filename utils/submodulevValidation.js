const Joi = require('joi');

const submoduleValidation = Joi.object({
  projectId: Joi.string().required(),   
  moduleId: Joi.string().required(),    
  name: Joi.string().required(),       
  created_by: Joi.string().required(),  
  updated_by: Joi.string().optional(),  
});

module.exports = submoduleValidation;

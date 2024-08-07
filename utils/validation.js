const Joi = require('joi');

const registerSchema = Joi.object({
  firstname: Joi.string().min(2).max(30).required(),
  lastname: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  contactnumber: Joi.string().min(10).max(15).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const updateSchema = Joi.object({
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  email: Joi.string().optional(),
  contactnumber: Joi.string().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema
};

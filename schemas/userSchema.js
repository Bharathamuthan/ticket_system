const Joi = require('joi');

const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  contactnumber: Joi.string().required(),
  password: Joi.string().min(6).required(),
  created_by: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  email: Joi.string().email().optional(),
  contactnumber: Joi.string().optional(),
  password: Joi.string().min(6).optional(),
})

module.exports = { registerSchema, loginSchema, updateSchema, };

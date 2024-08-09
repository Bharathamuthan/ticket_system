const Joi = require('joi');

const roleSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    description: Joi.string().min(2).max(200).required(),
  });

  const roleupdateSchema = Joi.object({
    name: Joi.string().min(6).optional(),
    description: Joi.string().optional(),
  });

  module.exports = {
    roleSchema,
    roleupdateSchema
  };
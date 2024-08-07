const Joi = require('joi');

const roleSchema = Joi.object({
    admin: Joi.string().min(2).max(30).required(),
    developer: Joi.string().min(5).max(30).required(),
    teamlead: Joi.string().min(5).max(30).required(),
    tester: Joi.string().min(5).max(30).required(),
    description: Joi.string().min(2).max(200).required(),
  });

  const roleupdateSchema = Joi.object({
    admin: Joi.string().optional(),
    developer: Joi.string().optional(),
    teamlead: Joi.string().optional(),
    tester: Joi.string().min(6).optional(),
    description: Joi.string().optional(),
  });

  module.exports = {
    roleSchema,
    roleupdateSchema
  };
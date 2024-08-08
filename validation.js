const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        Firstname: Joi.string().min(2).max(50).required(),
        Lastname: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        Phonenumber: Joi.string().pattern(/^[0-9]{10}$/).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };

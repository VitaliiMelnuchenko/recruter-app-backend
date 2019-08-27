const MIN_LENGTH = 3;
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    title: Joi.string().min(MIN_LENGTH).required(),
    description: Joi.string().min(MIN_LENGTH).required(),
    status: Joi.string().required(),
    questions: Joi.array(),
    type: Joi.string().min(MIN_LENGTH).required()
};

module.exports = validator(schema);
const { MIN_LENGTH, MAX_SYSTEM_VAR_LENGTH } = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = Joi.object({
    currentValue: Joi.string()
        .trim()
        .min(MIN_LENGTH)
        .max(MAX_SYSTEM_VAR_LENGTH)
        .required(),
    newValue: Joi.string()
        .trim()
        .min(MIN_LENGTH)
        .max(MAX_SYSTEM_VAR_LENGTH)
        .required()
});

module.exports = validator(schema);

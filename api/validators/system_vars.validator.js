const { MIN_LENGTH, MAX_SYSTEM_VAR_LENGTH } = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    name: Joi.string()
        .lowercase()
        .trim()
        .min(MIN_LENGTH)
        .max(MAX_SYSTEM_VAR_LENGTH)
        .required()
};

module.exports = validator(schema);

const {
    MIN_LENGTH,
    MAX_FIRSTNAME_LENGTH,
    MAX_LASTNAME_LENGTH,
    RECRUITER,
    REVIEWER
} = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    email: Joi.string()
        .regex(/.+\@.+\..+/)
        .required(),
    firstname: Joi.string()
        .trim()
        .min(MIN_LENGTH)
        .max(MAX_FIRSTNAME_LENGTH),
    lastname: Joi.string()
        .trim()
        .min(MIN_LENGTH)
        .max(MAX_LASTNAME_LENGTH)
};

module.exports = validator(schema);

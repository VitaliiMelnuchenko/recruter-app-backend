const {
    MIN_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_DESC_LENGTH,
    MONGOOSE_ID_LENGTH
} = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    author: Joi.string()
        .alphanum()
        .length(MONGOOSE_ID_LENGTH)
        .required(),
    title: Joi.string()
        .trim()
        .min(MIN_LENGTH)
        .max(MAX_TITLE_LENGTH)
        .required(),
    description: Joi.string()
        .trim()
        .min(MIN_LENGTH)
        .max(MAX_DESC_LENGTH)
        .required(),
    status: Joi.string()
        .lowercase()
        .valid('active', 'on hold', 'closed'),
    questions: Joi.array()
        .items(Joi.string()
                .alphanum()
                .length(MONGOOSE_ID_LENGTH)
                .required())
        .required(),
    type: Joi.string()
        .lowercase()
        .valid('android', 'web', 'ios', 'managment')
        .required(),
    link: Joi.string()
        .trim()
        .allow('')
};

module.exports = validator(schema);

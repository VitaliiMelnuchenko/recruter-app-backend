const {
    MIN_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_DESC_LENGTH,
    MAX_SYSTEM_VAR_LENGTH,
    MONGOOSE_ID_LENGTH,
    MIN_ANSWER_TIME,
    MAX_NUM_OF_TOPICS
} = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    author: Joi.string()
        .alphanum()
        .length(MONGOOSE_ID_LENGTH),
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
    type: Joi.string()
        .lowercase()
        .valid('code', 'text', 'video')
        .required(),
    maxLength: Joi.number()
        .min(MIN_ANSWER_TIME)
        .integer()
        .required(),
    topics: Joi.array()
        .max(MAX_NUM_OF_TOPICS)
        .items(Joi.string()
                .lowercase()
                .trim()
                .min(MIN_LENGTH)
                .max(MAX_SYSTEM_VAR_LENGTH)
                .required())
        .required(),
    level: Joi.string()
        .lowercase()
        .valid('junior', 'middle', 'senior')
        .required()
};

module.exports = validator(schema);

const { MIN_LENGTH, MAX_TITLE_LENGTH, MAX_DESC_LENGTH } = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    author: Joi.string().alphanum().length(24),
    title: Joi.string().trim().min(MIN_LENGTH).max(MAX_TITLE_LENGTH).required(),
    description: Joi.string().trim().min(MIN_LENGTH).max(MAX_DESC_LENGTH).required(),
    type: Joi.string().lowercase().valid('code', 'text', 'video').required(),
    link: Joi.string().trim(),
    maxLength: Joi.number().greater(0).integer().required(),
    topics: Joi.array().unique().items(Joi.string().alphanum().length(24).required()).max(5).required(),
    level: Joi.string().lowercase().valid('junior', 'middle', 'senior').required()
};

module.exports = validator(schema);
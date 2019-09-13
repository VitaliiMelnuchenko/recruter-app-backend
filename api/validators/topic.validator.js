const { MIN_LENGTH, MAX_TOPIC_LENGTH } = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    name: Joi.string().trim().min(MIN_LENGTH).max(MAX_TOPIC_LENGTH).required()
};

module.exports = validator(schema);
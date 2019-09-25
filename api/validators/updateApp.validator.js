const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    startedAt: Joi.date(),
    completedAt: Joi.date(),
    evaluetedAt: Joi.date(),
    status: Joi.string()
        .lowercase()
        .valid('in progress', 'completed', 'evaluated')
};

module.exports = validator(schema);

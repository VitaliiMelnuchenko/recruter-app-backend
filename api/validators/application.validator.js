const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = {
    candidate: Joi.object().required(),
    vacancy: Joi.object().required(),
    reviewer: Joi.object(),
    questions: Joi.array().required(),
    startedAt: Joi.date(),
    completedAt: Joi.date(),
    evaluetedAt: Joi.date(),
    status: Joi.string().valid('invited', 'in progress', 'completed', 'evaluated'),
    score: joi.number(),
    comments: Joi.array()
};

module.exports = validator(schema);
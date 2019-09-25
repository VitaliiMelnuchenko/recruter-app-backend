const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');
const { MONGOOSE_ID_LENGTH } = require('../CONSTANTS');

const schema = {
    candidate: Joi.string()
        .alphanum()
        .length(MONGOOSE_ID_LENGTH)
        .required(),
    vacancy: Joi.string()
        .alphanum()
        .length(MONGOOSE_ID_LENGTH)
        .required()
};

module.exports = validator(schema);

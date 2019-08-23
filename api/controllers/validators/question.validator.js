const MIN_LENGTH = 3;
const Joi = require('@hapi/joi');

const schema = {
    title: Joi.string().min(MIN_LENGTH).required(),
    description: Joi.string().min(MIN_LENGTH).required(),
    type: Joi.string().min(MIN_LENGTH).required(),
    // options:
    maxLength: Joi.number().required(),
    // topics:
    level: Joi.string().min(MIN_LENGTH).required()
}

module.exports = data => {
    return Joi.validate(data, schema);
}

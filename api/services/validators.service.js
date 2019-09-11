const Joi = require('@hapi/joi');
const errorHandler = require('../../utils/errorHandler');

module.exports = schema => (data) => {
    try {
        const result = Joi.validate(data, schema);
        if (result.error) {
            const error = errorHandler.invalidJoi(result.error);
            throw error
        }
    } catch(err) {
        throw err;
    }
};
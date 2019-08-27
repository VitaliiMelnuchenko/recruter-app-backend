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

module.exports = (req, res, next) => {
    try {
        const result = Joi.validate(req.body, schema);
        if ((result || { error: true }).error) {
            return res.status(400).json((((result || {})
            .error || []).details[0] || {}).message || 'Validation failed');
        } else {
            next();
        }
    } catch(err) {
        next(err);
    }
};
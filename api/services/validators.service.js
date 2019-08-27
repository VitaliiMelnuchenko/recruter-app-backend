const Joi = require('@hapi/joi');

module.exports = schema => (req, res, next) => {
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
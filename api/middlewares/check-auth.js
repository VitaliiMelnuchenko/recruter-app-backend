const jwt = require('jsonwebtoken');
const errorHandler = require('../../utils/errorHandler');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.local = {
            user: decoded
        };
        next();
    } catch(err) {
        const error = errorHandler.unauthorized(err);
        next(error);
    }
};
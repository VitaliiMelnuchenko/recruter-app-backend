const errorHandler = require('../../utils/errorHandler');

module.exports = (...roles) => (req, res, next) => {
    try {
        if (req.local.user && roles.indexOf(req.local.user.role) == !-1) {
            next();
        } else {
            const error = errorHandler.forbidden("You don't have permission to do that");
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

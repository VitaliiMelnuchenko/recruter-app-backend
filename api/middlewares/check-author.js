const errorHandler = require('../../utils/errorHandler');
const { ADMIN } = require('../CONSTANTS');

module.exports = model => async (req, res, next) => {
    try {
        const doc = await model.findById(req.params.id);
        if (
            req.local.user._id === doc.author ||
            req.local.user.role === ADMIN
        ) {
            next();
        } else {
            const error = errorHandler.forbidden("You don't have permission to do that");
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

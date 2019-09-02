const userService = require('../services/user.service');

const signin = async (req, res, next) => {
    try {
        const user = await userService.google_auth(req.body.token);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}

module.exports = { signin };
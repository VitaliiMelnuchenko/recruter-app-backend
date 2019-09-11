const userService = require('../services/user.service');

const signin = async (req, res, next) => {
    try {
        const user = await userService.google_auth(req.body.token);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
};

const inviteCandidate = async (req, res, next) => {
    try {
        const candidate = req.body.candidate;
        const vacancyId = req.body.vacancy;
        await userService.inviteCandidate(candidate, vacancyId);
        res.status(200).json({message: 'candidate has been invited'});
    } catch(err) {
        next(err);
    }
};

const activateUser = async (req, res, next) => {
    try {
        await userService.activateUser(req.body.code);
        res.status(200).json({message: 'user has been activated'});
    } catch(err) {
        next(err);
    }
};

module.exports = { signin, inviteCandidate, activateUser };

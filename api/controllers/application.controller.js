const applicationService = require('../services/application.service');
const userService = require('../services/user.service');
const validateAppUpdate = require('../validators/updateApp.validator');
const errorHandler = require('../../utils/errorHandler');
const { CANDIDATE, REVIEWER } = require('../CONSTANTS');

const getApplications = async (req, res, next) => {
    try {
        const filter = {};
        if (req.local.user.role === REVIEWER)
            filter.reviewer = req.local.user._id;
        const applications = await applicationService.getMany(filter);
        res.status(200).json(applications);
    } catch (err) {
        next(err);
    }
};

const getApplicationsById = async (req, res, next) => {
    try {
        const application = await applicationService.getOne(req.params.id);
        if (
            req.local.user.role === CANDIDATE &&
            req.local.user._id !== application.candidate
        ) {
            throw errorHandler.forbidden();
        }
        if (
            req.local.user.role === REVIEWER &&
            application.reviewer !== req.local.user._id
        ) {
            throw errorHandler.forbidden();
        }
        res.status(200).json(application);
    } catch (err) {
        next(err);
    }
};

const updateApplication = async (req, res, next) => {
    try {
        validateAppUpdate(req.body);
        const updatedApp = await applicationService.updateOne(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedApp);
    } catch (err) {
        next(err);
    }
};

const setReviewer = async (req, res, next) => {
    try {
        const reviewer = userService.findUser({ _id: req.body.reviewer });
        if (reviewer && reviewer.role !== CANDIDATE) {
            const updatedApp = await applicationService.updateOne(
                req.params.id,
                req.body
            );
            res.status(200).json(updatedApp);
        } else {
            throw errorHandler.badRequest();
        }
    } catch (err) {
        next(err);
    }
};

const deleteApplications = async (req, res, next) => {
    try {
        const deletedApplication = await applicationService.remove(req.body.appIdList);
        res.status(204).json(deletedApplication);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getApplications,
    getApplicationsById,
    updateApplication,
    setReviewer,
    deleteApplications
};

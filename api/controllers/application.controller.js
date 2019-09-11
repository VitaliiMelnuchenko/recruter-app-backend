const applicationService = require('../services/application.service');

const createApplications = async (req, res, next) => {
    try {
        const newApplication = await applicationService.createOne(req.body);
        res.status(201).json(newApplication);
    } catch(err) {
        next(err);
    }
};

const getApplications = async (req, res, next) => {
    try {
        const applications = await applicationService.getMany();
        res.status(200).json(applications);
    } catch(err){
        next(err);
    }
};

const getApplicationsById = async (req, res, next) => {
    try {
        const application = await applicationService.getOne(req.params.id);
        res.status(200).json(application);
    } catch(err) {
        next(err);
    }
};

const updateApplication = async (req, res, next) => {
    try {
        const updatedApplication = await applicationService.updateOne(req.params.id, req.body);
        res.status(200).json(updatedApplication);
    } catch(err) {
        next(err);
    }
};

const deleteApplication = async (req, res, newt) => {
    try {
        const deletedApplication = await applicationService.removeOne(req.params.id);
        res.status(204).json(deletedApplication);
    } catch(err) {
        next(err);
    }
};

module.exports = { createApplications, getApplications, getApplicationsById, updateApplication, deleteApplication };
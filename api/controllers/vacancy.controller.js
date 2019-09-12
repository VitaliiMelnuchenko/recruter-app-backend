const vacancyService = require('../services/vacancy.service');
const vacancyDT = require('../DTO/vacancy.dto');
const validateVacancy = require('../validators/vacancy.validator');

const createVacancy = async (req, res, next) => {
    try {
        const data = {
            author: req.local.user._id,
            ...req.body
        };
        validateVacancy(data);
        const newVacancy = await vacancyService.createOne(data);
        const result = vacancyDT(newVacancy);
        res.status(201).json(result);
    } catch(err) {
        res.satus(500).json(req.local.user._id);
        next(err);
    }
};

const getVacancy = async (req, res, next) => {
    try {
        const vacancies = await vacancyService.getMany();
        const result = vacancies.map(vacancy => vacancyDT(vacancy));
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
};

const getVacancyById = async (req, res, next) => {
    try {
        const foundVacancy = await vacancyService.getOne(req.params.id);
        const result = vacancyDT(foundVacancy);
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
};

const updateVacancy = async (req, res, next) => {
    try {
        const data = {
            author: req.local.user._id,
            ...req.body
        };
        validateVacancy(data);
        const updatedVacancy = await vacancyService.updateOne(req.params.id, data);
        const result = vacancyDT(updatedVacancy);
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
};

const deleteVacancy = async (req, res, next) => {
    try {
        const deletedVacancy = await vacancyService.removeOne(req.params.id);
        res.status(204).json(deletedVacancy);
    } catch(err) {
        next(err);
    }
};

module.exports = { 
    createVacancy, 
    getVacancy, 
    getVacancyById, 
    updateVacancy, 
    deleteVacancy 
};
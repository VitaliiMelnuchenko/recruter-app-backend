const vacancyService = require('../services/vacancy.service');
const toVacancyDTO = require('../DTO/vacancy.dto');
const validateVacancy = require('../validators/vacancy.validator');
const applicationService = require('../services/application.service');

const createVacancy = async (req, res, next) => {
    try {
        const data = {
            author: req.local.user._id,
            ...req.body
        };
        validateVacancy(data);
        const newVacancy = await vacancyService.createOne(data);
        const result = toVacancyDTO(newVacancy);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const getVacancy = async (req, res, next) => {
    try {
        const vacancies = await vacancyService.getMany();
        const result = vacancies.map(toVacancyDTO);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getVacancyById = async (req, res, next) => {
    try {
        const foundVacancy = await vacancyService.getOne(req.params.id);
        const result = toVacancyDTO(foundVacancy);
        res.status(200).json(result);
    } catch (err) {
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
        const updatedVacancy = await vacancyService.updateOne(
            req.params.id,
            data
        );
        const result = toVacancyDTO(updatedVacancy);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const deleteVacancy = async (req, res, next) => {
    try {
        const deletedVacancy = await vacancyService.removeOne(req.params.id);
        res.status(204).json(deletedVacancy);
    } catch (err) {
        next(err);
    }
};

const getVacancyApps = async (req, res, next) => {
    try {
        const filter = { vacancy: req.params.id };
        const apps = await applicationService.getMany(filter);
        res.status(200).json(apps);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createVacancy,
    getVacancy,
    getVacancyById,
    updateVacancy,
    deleteVacancy,
    getVacancyApps
};

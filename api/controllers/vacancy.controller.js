const vacancyService = require('../services/vacancy.service');

const createVacancy = async (req, res, next) => {
    const newVacancy = await vacancyService.createOne(req.body);
    res.status(201).json(newVacancy);
}

const getVacancy = async (req, res, next) => {
    try {
        const vacancies = await vacancyService.getMany();
        res.status(200).json(vacancies);
    } catch(err) {
        next(err);
    }
}

const getVacancyById = async (req, res, next) => {
    try {
        const foundVacancy = await vacancyService.getOne(req.params.id);
        res.status(200).json(foundVacancy);
    } catch(err) {
        next(err);
    }
}

const updateVacancy = async (req, res, next) => {
    try {
        const updatedVacancy = await vacancyService.updateOne(req.params.id, req.body);
        res.status(200).json(updatedVacancy);
    } catch(err) {
        next(err);
    }
}

const deleteVacancy = async (req, res, next) => {
    try {
        const deletedVacancy = await vacancyService.removeOne(req.params.id);
        res.status(204).json(deletedQuestion);
    } catch(err) {
        next(err);
    }
}

module.exports = { 
    createVacancy, 
    getVacancy, 
    getVacancyById, 
    updateVacancy, 
    deleteVacancy 
};
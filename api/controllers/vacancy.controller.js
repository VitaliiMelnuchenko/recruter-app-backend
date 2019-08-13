const { Vacancy } = require('../models/index');
const Joi = require('@hapi/joi');

module.exports = { getVacancies, createVacancy, getVacancyById, updateVacancy, deleteVacancy };

function getVacancies(req, res, next) {
    Vacancy.find({}).select('-__v')
        .then(vacancies => {
            if (vacancies.length) {
                res.status(200).json(vacancies);
            }
            res.status(200).json({
                message: 'there are no vacancies in database'
            });
        })
        .catch(err => {
            next(err);
        });
}

function createVacancy(req, res, next) {
    Vacancy.create(req.body)
        .then(() => {
            res.status(201).json({
                message: 'vacancy created'
            });
        })
        .catch(err => {
            next(err);
        });
}

function getVacancyById(req, res, next) {
    Vacancy.findById(req.params.vacancyId).select('-__v')
        .then(foundVacancy => {
            if (foundVacancy) {
                res.status(200).json(foundVacancy);
            }
            res.status(400).json({
                message: 'there is no vacancy with given ID'
            });
        })
        .catch(err => {
            next(err);
        });
}

function updateVacancy(req, res, next) {
    Vacancy.findByIdAndUpdate(req.params.vacancyId, req.body)
        .then(updatedVacancy => {
            if (updatedVacancy) {
                res.status(200).json({
                    message: 'vacancy updated'
                });
            }
            res.status(400).json({
                message: 'there is no vacancy with given ID'
            });
        })
        .catch(err => {
            next(err);
        });
}

function deleteVacancy(req, res, next) {
    Vacancy.findByIdAndDelete(req.params.vacancyId)
        .then(deletedVacancy => {
            if (deletedVacancy) {
                res.status(200).json({
                    message: 'vacancy deleted'
                });
            }
            res.status(400).json({
                message: 'there is no vacancy with given ID'
            });
        })
        .catch(err => {
            next(err);
        });
}


const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy.controller');
const requireRoles = require('../middlewares/check-role');
const { Vacancy } = require('../models');
const checkAuthor = require('../middlewares/check-author');
const checkVacancyAuthor = checkAuthor(Vacancy);
const { ADMIN, RECRUITER } = require('../CONSTANTS');

router.use(requireRoles(ADMIN, RECRUITER));

router
    .route('/')
    .get(vacancyController.getVacancy)
    .post(vacancyController.createVacancy);

router
    .route('/:id')
    .get(vacancyController.getVacancyById)
    .put(checkVacancyAuthor, vacancyController.updateVacancy)
    .delete(checkVacancyAuthor, vacancyController.deleteVacancy);

router.get('/:id/applications', vacancyController.getVacancyApps);

module.exports = router;

const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy.controller');

router.route('/')
.get(vacancyController.getVacancy)
.post(vacancyController.createVacancy);

router.route('/:id')
.get(vacancyController.getVacancyById)
.put(vacancyController.updateVacancy)
.delete(vacancyController.deleteVacancy);

module.exports = router;
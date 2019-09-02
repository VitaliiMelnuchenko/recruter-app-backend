const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy.controller');
const vacancyValidator = require('../middlewares/validators/vacancy.validator');

router.route('/')
.get(vacancyController.getVacancy)
.post(vacancyValidator, vacancyController.createVacancy);

router.route('/:id')
.get(vacancyController.getVacancyById)
.put(vacancyValidator, vacancyController.updateVacancy)
.delete(vacancyController.deleteVacancy);

module.exports = router;
const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy.controller');

router.get('/', vacancyController.getVacancies);

router.post('/', vacancyController.createVacancy);

router.get('/:vacancyId', vacancyController.getVacancyById);

router.put('/:vacancyId', vacancyController.updateVacancy);

router.delete('/:vacancyId', vacancyController.deleteVacancy);

module.exports = router;
const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy.controller');
const checkAuth = require('../middlewares/check-auth');

router.route('/')
.get(checkAuth, vacancyController.getVacancy)
.post(checkAuth, vacancyController.createVacancy);

router.route('/:id')
.get(checkAuth, vacancyController.getVacancyById)
.put(checkAuth, vacancyController.updateVacancy)
.delete(checkAuth, vacancyController.deleteVacancy);

module.exports = router;
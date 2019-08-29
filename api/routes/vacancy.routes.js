const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy.controller');
const vacancyValidator = require('../middlewares/validators/vacancy.validator');

router.route('/')
.get(vacancyController.getMany)
.post(vacancyValidator, vacancyController.createOne);

router.route('/:id')
.get(vacancyController.getOne)
.put(vacancyValidator, vacancyController.updateOne)
.delete(vacancyController.removeOne);

module.exports = router;
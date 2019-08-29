const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const questionValidator = require('../middlewares/validators/question.validator');

router.route('/')
.get(questionController.getMany)
.post(questionValidator, questionController.createOne);

router.route('/:id')
.get(questionController.getOne)
.put(questionValidator, questionController.updateOne)
.delete(questionController.removeOne);

module.exports = router;
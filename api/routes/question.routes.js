const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const questionValidator = require('../middlewares/validators/question.validator');

router.route('/')
.get(questionController.getQuestions)
.post(questionValidator, questionController.createQuestion);

router.route('/:id')
.get(questionController.getQuestionById)
.put(questionValidator, questionController.updateQuestion)
.delete(questionController.deleteQuestion);

module.exports = router;
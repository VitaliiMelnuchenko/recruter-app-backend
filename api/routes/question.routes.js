const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.route('/')
.get(questionController.getQestions)
.post(questionController.createQuestion);

router.route('/:id')
.get(questionController.getQuestionById)
.put(questionController.updateQuestion)
.delete(questionController.deleteQuestion);

module.exports = router;
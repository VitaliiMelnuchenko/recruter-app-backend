const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const checkAuth = require('../middlewares/check-auth');

router.route('/')
.get(checkAuth, questionController.getQuestions)
.post(checkAuth, questionController.createQuestion);

router.route('/:id')
.get(checkAuth ,questionController.getQuestionById)
.put(checkAuth, questionController.updateQuestion)
.delete(checkAuth, questionController.deleteQuestion);

module.exports = router;
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const requireRoles = require('../middlewares/check-role');
const { Question } = require('../models');
const checkAuthor = require('../middlewares/check-author');
const checkQuestionAuthor = checkAuthor(Question);
const { ADMIN, RECRUITER, REVIEWER } = require('../CONSTANTS');

router.use(requireRoles(ADMIN, RECRUITER, REVIEWER));

router
    .route('/')
    .get(questionController.getQuestions)
    .post(questionController.createQuestion);

router
    .route('/:id')
    .get(questionController.getQuestionById)
    .put(checkQuestionAuthor, questionController.updateQuestion)
    .delete(checkQuestionAuthor, questionController.deleteQuestion);

module.exports = router;

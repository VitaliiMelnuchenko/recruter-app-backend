const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.get('/', questionController.getQestions);

router.post('/', questionController.createQuestion);

router.get('/:questionId', questionController.getQuestionById);

router.put('/:questionId', questionController.updateQuestion);

router.delete('/:questionId', questionController.deleteQuestion);

module.exports = router;
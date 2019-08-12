const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.get('/', questionController.getQestions);

router.post('/', questionController.createQuestion);

router.get('/:questionId', questionController.getQestionById);

router.put('/:questionId', questionController.updateQuestion);

router.delete('/:questionId', (req, res, next) => {
    res.send(req.params.questionID + ' question deleted');
});

module.exports = router;
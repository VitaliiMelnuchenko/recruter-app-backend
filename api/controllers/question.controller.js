const { Question } = require('../models/index');

module.exports = { getQestions, createQuestion, getQestionById, updateQuestion };

function getQestions(req, res, next) {
    res.send('questions list');
};

function createQuestion(req, res, next) {
    Question.create(req.body)
        .then(() => {
            res.status(201).json({
                message: 'question has been created'
            });
        })
        .catch(err => {
            next(err);
        });
}

function getQestionById(req, res, next) {
    Question.findById(req.params.questionId).select('-__v')
        .then(foundQuestion => {
            res.status(200).json(foundQuestion);
        })
        .catch(err => {
           next(err);
        });
}

function updateQuestion(req, res, next) {
    Question.findByIdAndUpdate(req.params.questionId, req.body).select('-__v')
        .then(updatedQuestion => {
            res.status(200).json({
                message: 'question updated',
                question: updatedQuestion
            })
        })
        .catch(err => {
            next(err);
        })
}
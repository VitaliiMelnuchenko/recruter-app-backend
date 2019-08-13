const { Question } = require('../models/index');
const Joi = require('@hapi/joi');

module.exports = { getQestions, createQuestion, getQuestionById, updateQuestion, deleteQuestion };

function getQestions(req, res, next) {
    Question.find({}).select('-__v')
        .then(questions => {
            if (questions.length) {
                res.status(200).json(questions);
            }
            res.status(200).json({
                message: 'there are no questions in database'
            });
        })
        .catch(err => {
            next(err);
        });
}

function createQuestion(req, res, next) {
    const schema = {
        title: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        type: Joi.string().min(3).required(),
        // options:
        maxLength: Joi.number().required(),
        // topics:
        level: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }
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

function getQuestionById(req, res, next) {
    Question.findById(req.params.questionId).select('-__v')
        .then(foundQuestion => {
            if (foundQuestion) {
                res.status(200).json(foundQuestion);
            }
            res.status(400).json({
                message: 'there is no question with given ID'
            });
        })
        .catch(err => {
           next(err);
        });
}

function updateQuestion(req, res, next) {
    const schema = {
        title: Joi.string().min(3),
        description: Joi.string().min(3),
        type: Joi.string().min(3),
        // options:
        maxLength: Joi.number(),
        // topics:
        level: Joi.string().min(3)
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }
    Question.findByIdAndUpdate(req.params.questionId, req.body).select('-__v')
        .then(updatedQuestion => {
            if (updatedQuestion) {
                res.status(200).json({
                    message: 'question updated',
                    question: updatedQuestion
                });
            }
            res.status(400).json({
               message: 'there is no ques with with given ID'
            });
        })
        .catch(err => {
            next(err);
        })
}

function deleteQuestion(req, res,next) {
    Question.findByIdAndDelete(req.params.questionId)
        .then(deletedQuestion => {
            if (deletedQuestion) {
                res.status(200).json({
                    messaage: 'question deleted',
                    deletedQuestion: deletedQuestion
                });
            }
            res.status(400).json({
                message: 'there is no ques with with given ID'
            });
        })
        .catch(err => {
            next(err);
        })
}
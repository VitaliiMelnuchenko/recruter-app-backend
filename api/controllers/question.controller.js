const { Question } = require('../models');
const questionValidator = require('./validators/question.validator');

module.exports = { getQestions, createQuestion, getQuestionById, updateQuestion, deleteQuestion };

async function getQestions(req, res, next) {
    try {
        const questions = await Question.find({}).select('-__v').exec();
        if (questions.length) {
            res.status(200).json(questions);
        } else {
            res.status(200).json({ message: 'there are no questions in database' });
        }
    } catch(err) {
        next(err);
    }
}

async function createQuestion(req, res, next) {
    try {
        if ((questionValidator(req.body) || { error: true }).error) {
            return res.status(400).json((((questionValidator(req.body) || {})
            .error || []).details[0] || {}).message || 'Validation failed');
        }
        const newQuestion = await Question.create(req.body);
        res.status(201).json({ message: 'question has been created' });
    } catch(err) {
        next(err);
    }
}

async function getQuestionById(req, res, next) {
    try {
        const foundQuestion = await Question.findById(req.params.id).select('-__v').exec();
        if (foundQuestion) {
            res.status(200).json(foundQuestion);
        } else {
            res.status(400).json({ message: 'there is no question with given ID' });
        }
    } catch(err) {
        next(err);
    }
}

async function updateQuestion(req, res, next) {
    try {
        if ((questionValidator(req.body) || { error: true }).error) {
            return res.status(400).json((((questionValidator(req.body) || {})
            .error || []).details[0] || {}).message || 'Validation failed');
        }
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body).select('-__v').exec();
        if (updatedQuestion) {
            res.status(200).json({ message: 'question updated' });
        } else {
            res.status(400).json({ message: 'there is no question with with given ID' });
        }
    } catch(err) {
        next(err);
    }
}

async function deleteQuestion(req, res, next) {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id).exec();
        if (deletedQuestion) {
            res.status(200).json({
                message: 'question has been deleted and removed from all vacancies'
            });
        } else {
            res.status(400).json({ message: 'there is no question with with given ID' })
        }
    } catch(err) {
        next(err);
    }
}
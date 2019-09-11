const questionService = require('../services/question.service');
const validateQuestion = require('../validators/question.validator');
const questionDT = require('../DTO/question.dto');

const createQuestion = async (req, res, next) => {
    try {
        const data = {
            author: req.local.user._id,
            ...req.body
        };
        validateQuestion(data);
        const newQuestion = await questionService.createOne(data);
        const result = questionDT(newQuestion);
        res.status(201).json(result);
    } catch(err) {
        next(err);
    }
};

const getQuestions = async (req, res, next) => {
    try {
        const questions = await questionService.getMany();
        const result = questions.map(question => questionDT(question));
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
};

const getQuestionById = async (req, res, next) => {
    try {
        const foundQuestion = await questionService.getOne(req.params.id);
        const result = questionDT(foundQuestion);
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
};

const updateQuestion = async (req, res, next) => {
    try {
        const data = {
            author: req.local.user._id,
            ...req.body
        };
        validateQuestion(data);
        const updatedQuestion = await questionService.updateOne(req.params.id, data);
        const result = questionDT(updatedQuestion);
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
};

const deleteQuestion = async (req, res, next) => {
    try {
        const deletedQuestion = await questionService.removeOne(req.params.id);
        res.status(204).json(deletedQuestion);
    } catch(err) {
        next(err);
    }
};

module.exports = { 
    createQuestion, 
    getQuestions, 
    getQuestionById, 
    updateQuestion, 
    deleteQuestion 
};
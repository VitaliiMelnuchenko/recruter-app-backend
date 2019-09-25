const questionService = require('../services/question.service');
const validateQuestion = require('../validators/question.validator');
const toQuestionDTO = require('../DTO/question.dto');

const createQuestion = async (req, res, next) => {
    try {
        const data = {
            author: req.local.user._id,
            ...req.body
        };
        validateQuestion(data);
        const newQuestion = await questionService.createOne(data);
        const result = toQuestionDTO(newQuestion);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const getQuestions = async (req, res, next) => {
    try {
        const questions = await questionService.getMany();
        const result = questions.map(toQuestionDTO);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getQuestionById = async (req, res, next) => {
    try {
        const foundQuestion = await questionService.getOne(req.params.id);
        const result = toQuestionDTO(foundQuestion);
        res.status(200).json(result);
    } catch (err) {
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
        const updatedQuestion = await questionService.updateOne(
            req.params.id,
            data
        );
        const result = toQuestionDTO(updatedQuestion);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const deleteQuestion = async (req, res, next) => {
    try {
        const deletedQuestion = await questionService.removeOne(req.params.id);
        res.status(204).json(deletedQuestion);
    } catch (err) {
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

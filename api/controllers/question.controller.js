const questionService = require('../services/question.service');
const questionDT = require('../DTO/question.dto');

const createQuestion = async (req, res, next) => {
    const newQuestion = await questionService.createOne(req.body);
    res.status(201).json(newQuestion);
}

const getQuestions = async (req, res, next) => {
    try {
        const questions = await questionService.getMany();
        res.status(200).json(questions);
    } catch(err) {
        next(err);
    }
}

const getQuestionById = async (req, res, next) => {
    try {
        const foundQuestion = await questionService.getOne(req.params.id);
        res.status(200).json(questionDT(foundQuestion));
    } catch(err) {
        next(err);
    }
}

const updateQuestion = async (req, res, next) => {
    try {
        const updatedQuestion = await questionService.updateOne(req.params.id, req.body);
        res.status(200).json(updatedQuestion);
    } catch(err) {
        next(err);
    }
}

const deleteQuestion = async (req, res, next) => {
    try {
        const deletedQuestion = await questionService.removeOne(req.params.id);
        res.status(204).json(deletedQuestion);
    } catch(err) {
        next(err);
    }
}

module.exports = { 
    createQuestion, 
    getQuestions, 
    getQuestionById, 
    updateQuestion, 
    deleteQuestion 
};
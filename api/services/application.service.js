const { Application, Vacancy, Question } = require('../models');
const vacancyService = require('./vacancy.service');
const errorHandler = require('../../utils/errorHandler');
const badRequestErr = errorHandler.badRequest('There is no document with given ID');

const createOne = async data => {
    try {
        const copyQuestion = question => {
            return {
                type: question.type ? question.type : null,
                question: question._id ? question._id : null
            };
        };
        const newDoc = await Application.create(data);
        const populateVacancy = await Vacancy.populate(newDoc, {
            path: 'vacancy'
        });
        const populateVcacncyQuestions = await Question.populate(
            newDoc.vacancy,
            { path: 'questions' }
        );
        newDoc.questions = populateVcacncyQuestions.questions.map(copyQuestion);
        const filledApplication = await newDoc.save();
        return filledApplication;
    } catch (err) {
        throw err;
    }
};

const getMany = async (filter = {}) => {
    try {
        const docs = await Application.find(filter)
            .populate({
                path: 'vacancy',
                populate: { path: 'questions' }
            })
            .populate('questions.question candidate reviewer');
        return docs;
    } catch (err) {
        throw err;
    }
};

const getOne = async id => {
    try {
        const doc = await Application.findById(id)
            .populate({
                path: 'vacancy',
                populate: { path: 'questions' }
            })
            .populate('questions.question candidate reviewer');
        if (doc) {
            return doc;
        } else {
            throw badRequestErr;
        }
    } catch (err) {
        throw err;
    }
};

const updateOne = async (id, data) => {
    try {
        const updatedApp = await Application.findByIdAndUpdate(id, data, {
            new: true
        })
            .populate({
                path: 'vacancy',
                populate: { path: 'questions' }
            })
            .populate('questions.question candidate reviewer');
        if (updatedApp) {
            return updatedApp;
        } else {
            throw badRequestErr;
        }
    } catch (err) {
        throw err;
    }
};

const remove = async appIdList => {
    try {
        if (!Array.isArray(appIdList)) throw errorHandler.badRequest();
        const deletedApps = await Application.deleteMany({
            _id: { $in: appIdList }
        });
        return deletedApps;
    } catch (err) {
        throw err;
    }
};

module.exports = { createOne, getMany, getOne, updateOne, remove };

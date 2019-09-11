const { Question } = require('../models');
const errorHandler = require('../../utils/errorHandler');
const badRequestErr = errorHandler.badRequest('There is no document with given ID');

const createOne = async newQuestion => {
    try {
        const newDoc = await Question.create(newQuestion);
        return newDoc;
    } catch(err) {
        throw err;
    }
};

const getMany = async () => {
    try {        
        const documents = await Question.find({});
        return documents;
    } catch(err) {
        throw err;
    }
};

const getOne = async (id) => {
    try {
        const document = await Question.findById(id);
        if (document) {
            return document;
        } else {
            throw badRequestErr;
        }
    } catch(err) {
        throw err;
    }
};

const updateOne = async (id, doc) => {
    try {
        const updatedDoc = await Question.findByIdAndUpdate(id, doc, { new: true });
        if (updatedDoc) {
            return updatedDoc;
        } else {
            throw badRequestErr;
        }
    } catch(err) {
        throw err;
    }
};

const removeOne = async (id) => {
    try {
        const foundDoc = await Question.findById(id);
        if (foundDoc) {
            const deletedDoc = await foundDoc.remove();
            return deletedDoc;
        } else {
            throw badRequestErr;
        }
    } catch(err) {
        throw err;
    }
};

module.exports = { createOne, getMany, getOne, updateOne, removeOne };
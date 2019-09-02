const { Question } = require('../models');

const createOne = async newQuestion => {
    try {
        const newDoc = await Question.create(newQuestion);
        return newDoc;
    } catch(err) {
        return err;
    }
}

const getMany = async () => {
    try {        
        const documents = await Question.find({});
        return documents;
    } catch(err) {
        throw new Error(err);
    }
}

const getOne = async (id) => {
    try {
        const document = await Question.findById(id);
        if (document) {
            return document;
        } else {
            throw new Error('There is no document with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
}

const updateOne = async (id, doc) => {
    try {
        const updatedDoc = await Question.findByIdAndUpdate(id, doc, { new: true });
        if (updatedDoc) {
            return updatedDoc;
        } else {
            throw new Error('There is no document with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
}

const removeOne = async (id) => {
    try {
        const foundDoc = await Question.findById(id);
        const deletedDoc = await foundDoc.remove();
        if (deletedDoc) {
            return deletedDoc;
        } else {
            throw new Error('There is no document with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = { createOne, getMany, getOne, updateOne, removeOne }
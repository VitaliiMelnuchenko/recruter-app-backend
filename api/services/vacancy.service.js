const { Vacancy } = require('../models');

const createOne = async newVacancy => {
    try {
        const newDoc = await Vacancy.create(newVacancy);
        const populatedDoc = await Vacancy.populate(newDoc, { path: 'questions' });
        return populatedDoc;
    } catch(err) {
        return err;
    }
}

const getMany = async () => {
    try {        
        const documents = await Vacancy.find({});
        const populatedDoc = await Vacancy.populate(documents, { path: 'questions' });
        return populatedDoc;
    } catch(err) {
        throw new Error(err);
    }
}

const getOne = async (id) => {
    try {
        const document = await Vacancy.findById(id);
        const populatedDoc = await Vacancy.populate(document, { path: 'questions' });
        if (populatedDoc) {
            return populatedDoc;
        } else {
            throw new Error('There is no document with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
}

const updateOne = async (id, doc) => {
    try {
        const updatedDoc = await Vacancy.findByIdAndUpdate(id, doc, { new: true });
        const populatedDoc = await Vacancy.populate(updatedDoc, { path: 'questions' });
        if (populatedDoc) {
            return populatedDoc;
        } else {
            throw new Error('There is no document with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
}

const removeOne = async (id) => {
    try {
        const foundDoc = await Vacancy.findById(id);
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
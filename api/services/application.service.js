const { Application } = require('../models');
const vacancyService = require('./vacancy.service');

const createOne = async (data) => {
    try {
        const vacancy = await vacancyService.getOne(data.vacancy);
        if (vacancy.status !== 'active') {
            throw new Error('Vacancy is not active');
        }
        const newDoc = await Application.create(data);
        return newDoc;
    } catch(err) {
        throw new Error(err);
    }
};

const getMany = async () => {
    try {
        const docs = await Application.find({});
        return docs;
    } catch(err) {
        throw new Error(err);
    }
};

const getOne = async (id) => {
    try {
        const doc = await Application.findById(id);
        if (doc) {
            return doc;
        } else {
            throw new Error('There is no doc with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
};

const updateOne = async (id, data) => {
    try {
        const updatedDoc = Application.findByIdAndUpdate(id, data, { new: true });
        if (updatedDoc) {
            return updatedDoc;
        } else {
            throw new Error('There is no doc with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
};

const removeOne = async (id) => {
    try {
        const foundDoc = await Application.findById(id);
        const deletedDoc = await foundDoc.remove();
        if (deletedDoc) {
            return deletedDoc;
        } else {
            throw new Error('There is no document with given ID');
        }
    } catch(err) {
        throw new Error(err);
    }
};

module.exports = { createOne, getMany, getOne, updateOne, removeOne }
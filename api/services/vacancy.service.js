const { Vacancy } = require('../models');
const vacancyDT = require('../DTO/vacancy.dto');

const createOne = async newVacancy => {
    try {
        const newDoc = await Vacancy.create(newVacancy);
        return newDoc;
    } catch(err) {
        return err;
    }
}

const getMany = async () => {
    try {        
        const documents = await Vacancy.find({});
        const populatedDocs = documents.map(async vacancy => {
            const aaa = await vacancyDT(vacancy);
            console.log(aaa);
            return aaa;
        });
        console.log(populatedDocs);
        return populatedDocs;
    } catch(err) {
        throw new Error(err);
    }
}

const getOne = async (id) => {
    try {
        const document = await Vacancy.findById(id);
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
        const updatedDoc = await Vacancy.findByIdAndUpdate(id, doc, { new: true });
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
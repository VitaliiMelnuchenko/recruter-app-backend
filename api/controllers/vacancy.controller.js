const { Vacancy } = require('../models');
const crudController = require('../services/controllers.service');

const createOne = async (req, res, next) => {
    try {
        const newDoc = await Vacancy.create(req.body);
        const populatedData = await Vacancy.populate(newDoc, { path: 'questions', select: '-__v' });
        const { __v, ...data } = populatedData._doc;
        res.status(201).json(data);
    } catch(err) {
        next(err);
    }
}

const updateOne = async (req, res, next) => {
    try {
        const updatedDoc = await Vacancy.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .select('-__v').populate('questions', '-__v').exec();
        if (updatedDoc) {
            res.status(200).json(updatedDoc);
        } else {
            res.status(400).json({ message: 'there is no document with given ID' });
        }
    } catch(err) {
        next(err);
    }
}

module.exports = { ...crudController(Vacancy), createOne, updateOne };
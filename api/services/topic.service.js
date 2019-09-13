const { Topic } = require('../models');
const errorHandler = require('../../utils/errorHandler');
const err400 = errorHandler.badRequest('There is no document with given ID');

const createOne = async (data) => {
    try {
        const newTopic = await Topic.create(data);
        return newTopic;
    } catch(err) {
        throw err;
    }
};

const getMany = async () => {
    try {
        const topics = await Topic.find({});
        return topics;
    } catch(err) {
        throw err;
    }
};

const updateOne = async (id, data) => {
    try {
        const updatedTopic = await Topic.findByIdAndUpdate(id, data, { new: true });
        if (updatedTopic) {
            return updatedTopic;
        } else {
            throw err400;
        }
    } catch(err) {
        throw err
    }
};

const deleteOne = async (id) => {
    try {
        const foundTopic = await Topic.findById(id);
        if (foundTopic) {
            const deletedTopic = await foundTopic.remove();
            return deletedTopic
        } else {
            throw err400;
        }
    } catch(err) {
        throw err
    }
};

module.exports = { createOne, getMany, updateOne, deleteOne };
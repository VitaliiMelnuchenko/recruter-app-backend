const topicService = require('../services/topic.service');
const validateTopic = require('../validators/topic.validator');

const createTopic = async (req, res, next) => {
    try {
        validateTopic(req.body);
        const newTopic = await topicService.createOne(req.body);
        res.status(201).json(newTopic);
    } catch(err) {
        next(err);
    }
}; 

const getTopics = async (req, res, next) => {
    try {
        const topics = await topicService.getMany();
        res.status(200).json(topics);
    } catch(err) {
        next(err);
    }
};

const updateTopic = async (req, res, next) => {
    try {
        validateTopic(req.body);
        const updatedTopic = await topicService.updateOne(req.params.topicId, req.body);
        res.status(200).json(updatedTopic)
    } catch(err) {
        next(err);
    }
};

const deleteTopic = async (req, res, next) => {
    try {
        const deletedTopic = await topicService.deleteOne(req.params.topicId);
        res.status(204).json(deletedTopic);
    } catch(err) {
        next(err);
    }
}

module.exports = { createTopic, getTopics, updateTopic, deleteTopic }; 
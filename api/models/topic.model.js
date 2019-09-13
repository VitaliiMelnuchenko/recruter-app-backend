const { MIN_LENGTH, MAX_TOPIC_LENGTH } = require('../CONSTANTS');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./question.model');

const TopicSchema = new Schema({
    name: { type: String, min: MIN_LENGTH, max: MAX_TOPIC_LENGTH, required: true, unique: true }
}, { versionKey: false });

TopicSchema.pre('remove', async function(next) {
    try {
        await Question.updateMany(
            { },
            { $pull: { topics: this._id } }
        );
        next();
    } catch(err) {
        next(err)
    }
});

module.exports = mongoose.model('Topic', TopicSchema);
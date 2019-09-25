const {
    MIN_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_DESC_LENGTH
} = require('../CONSTANTS');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vacancy = require('./vacancy.model');

const QuestionSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            min: MIN_LENGTH,
            max: MAX_TITLE_LENGTH,
            required: true
        },
        description: {
            type: String,
            min: MIN_LENGTH,
            max: MAX_DESC_LENGTH,
            required: true
        },
        type: { type: String, enum: ['code', 'text', 'video'], required: true },
        maxLength: { type: Number, required: true },
        topics: { type: [String], required: true },
        level: {
            type: String,
            enum: ['junior', 'middle', 'senior'],
            required: true
        }
    },
    { versionKey: false }
);

QuestionSchema.pre('remove', async function(next) {
    try {
        await Vacancy.updateMany({}, { $pull: { questions: this._id } });
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Question', QuestionSchema);

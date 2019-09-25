const {
    MIN_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_DESC_LENGTH
} = require('../CONSTANTS');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema(
    {
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
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'on hold', 'closed'],
            default: 'on hold'
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Question'
            }
        ],
        type: {
            type: String,
            enum: ['android', 'web', 'ios', 'managment'],
            required: true
        },
        link: { type: String, default: '' }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Vacancy', VacancySchema);

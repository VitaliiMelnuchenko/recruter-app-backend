const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    MIN_LENGTH,
    MAX_TOPIC_LENGTH,
    MAX_VACANCY_TYPE_LENGTH
} = require('../CONSTANTS');

const SystemVarsSchema = new Schema(
    {
        vacancy_types: [
            {
                type: String,
                min: MIN_LENGTH,
                max: MAX_VACANCY_TYPE_LENGTH,
                index: true,
                lowercase: true
            }
        ],
        topics: [
            {
                type: String,
                min: MIN_LENGTH,
                max: MAX_TOPIC_LENGTH,
                index: true,
                lowercase: true
            }
        ]
    },
    { versionKey: false }
);

module.exports = mongoose.model('System_vars', SystemVarsSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    //author:
    status: { type: String, default: 'open' },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    type: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Vacancy', VacancySchema);
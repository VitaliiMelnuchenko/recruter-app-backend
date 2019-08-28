const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./question.model');

const VacancySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    //author:
    status: { type: String, required: true },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    type: { type: String, required: true }
});

VacancySchema.pre('find', function(next) {
    try {
        this.populate('questions', '-__v');
        next();
    } catch(err) {
        next(err);
    }
});

module.exports = mongoose.model('Vacancy', VacancySchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vacancy = require('./vacancy.model');

const QuestionSchema = new Schema({
    // author: {
    //      type: Schema.Types.ObjectId,
    //      ref: 'User'
    // }
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    //options: [],
    maxLength: { type: Number, required: true },
    //topics: [],
    level: { type: String, required: true },
});

QuestionSchema.pre('remove', async function(next) {
    try {
        await Vacancy.update(
            { },
            { $pull: { questions: this._id } }
        ).exec();
        next();
    } catch(err) {
        next(err)
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
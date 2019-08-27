const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QestionSchema = new Schema({
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

QestionSchema.pre('remove', { query: true }, function() {
    console.log('test');
    Vacancy.update(
        { },
        { $pull: { questions: this._id } }
    ).exec()
        .then(() => next())
        .catch(err => next(err));
});

module.exports = mongoose.model('Question', QestionSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QestionSchema = new Schema({
    // author: {  }
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    // options:
    maxLength: { type: Number, required: true },
    // topics:
    level: { type: String, required: true },
});

module.exports = mongoose.model('Question', QestionSchema);
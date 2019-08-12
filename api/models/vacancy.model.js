const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({

});

module.exports = mongoose.model('Vacancy', VacancySchema);
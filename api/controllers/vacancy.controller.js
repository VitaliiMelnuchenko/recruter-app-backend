const { Vacancy } = require('../models/index');

module.exports = { getVacancies };

function getVacancies(req, res, next) {
    res.send('vacancies list');
};
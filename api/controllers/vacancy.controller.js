const { Vacancy } = require('../models');
const crudController = require('../services/controllers.service');

module.exports = crudController(Vacancy);
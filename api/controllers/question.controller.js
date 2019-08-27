const { Question } = require('../models');
const crudController = require('../services/controllers.service');

module.exports = crudController(Question);
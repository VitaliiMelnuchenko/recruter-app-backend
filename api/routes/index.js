const express = require('express');
const router = express.Router();

const questionsRoutes = require('./question.routes');
const vacanciesRoutes = require('./vacancy.routes');

router.use('/questions', questionsRoutes);
router.use('/vacancies', vacanciesRoutes);

router.use((err, req, res, next) => {
    res.status(500).json(err);
});

module.exports = router;
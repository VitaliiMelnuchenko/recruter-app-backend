const express = require('express');
const router = express.Router();

const vacanciesRoutes = require('./vacancy.route');
const questionsRoutes = require('./question.route');

router.get('/', (req, res, next) => {
    res.send('success');
});

router.use('/vacancies', vacanciesRoutes);
router.use('/questions', questionsRoutes);

router.use((err, req, res, next) => {
    res.status(500).json(err);
});

module.exports = router;
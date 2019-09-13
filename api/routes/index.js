const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const questionsRoutes = require('./question.routes');
const vacanciesRoutes = require('./vacancy.routes');
const usersRoutes = require('./user.routes');
const applicationRoutes = require('./application.routes');
const topicRoutes = require('./topic.routes');

router.use('/users', usersRoutes);
router.use('/topics', topicRoutes)
router.use('/questions', questionsRoutes);
router.use('/vacancies', vacanciesRoutes);
router.use('/applications', applicationRoutes);

router.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message || 'server error');
});

router.use('*', (req, res) => {
    res.status(404).json({ message: 'Error 404: Not found' });
});

module.exports = router;
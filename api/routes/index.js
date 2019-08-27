const express = require('express');
const router = express.Router();

const questionsRoutes = require('./question.routes');

router.use('/questions', questionsRoutes);

router.use((err, req, res, next) => {
    res.status(500).json(err);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy.controller');

router.get('/', vacancyController.getVacancies);

router.post('/', (req, res, next) => {
    res.send('vacancy created');
});

router.get('/:vacancyId', (req, res, next) => {
   res.send('vacancy: ' + req.params.vacancyId);
});

router.put('/:vacancyId', (req, res, next) => {
   res.send(req.params.vacancyId + ' vacancy updated');
});

router.delete('/:vacancyId', (req, res, next) => {
    res.send(req.params.vacancyId + ' vacancy deleted');
});

module.exports = router;
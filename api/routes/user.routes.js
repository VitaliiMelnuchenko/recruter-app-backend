const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.post('/auth', userController.signin);

router.post('/invite', userController.inviteCandidate);

router.post('/activate-user', userController.activateUser);

module.exports = router;
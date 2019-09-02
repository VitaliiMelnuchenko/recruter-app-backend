const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.post('/auth', userController.signin);

module.exports = router;
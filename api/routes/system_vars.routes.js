const express = require('express');
const router = express.Router();
const systemVarsController = require('../controllers/system_vars.controller');
const requireRoles = require('../middlewares/check-role');
const { ADMIN } = require('../CONSTANTS');

router.use(requireRoles(ADMIN));

router
    .route('/topics')
    .get(systemVarsController.getVars)
    .post(systemVarsController.createVar)
    .put(systemVarsController.updateVar)
    .delete(systemVarsController.deleteVar);

router
    .route('/vacancy_types')
    .get(systemVarsController.getVars)
    .post(systemVarsController.createVar)
    .put(systemVarsController.updateVar)
    .delete(systemVarsController.deleteVar);

module.exports = router;

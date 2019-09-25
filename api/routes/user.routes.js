const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');
const requireRoles = require('../middlewares/check-role');
const { ADMIN, RECRUITER } = require('../CONSTANTS');

router.post('/auth', userController.signin);

router.use(checkAuth);
router.post(
    '/invite',
    requireRoles(ADMIN, RECRUITER),
    userController.inviteCandidate
);

router.post(
    '/invite-reviewer',
    requireRoles(ADMIN),
    userController.inviteReviewer
);

router.post('/confirm', userController.activateUser);

router.post(
    '/filter',
    requireRoles(ADMIN, RECRUITER),
    userController.findByRole
);

router
    .route('/:id', requireRoles(ADMIN))
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;

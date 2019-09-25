const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const requireRoles = require('../middlewares/check-role');
const { ADMIN, RECRUITER, REVIEWER, CANDIDATE } = require('../CONSTANTS');

router
    .route('')
    .get(
        requireRoles(ADMIN, RECRUITER, REVIEWER),
        applicationController.getApplications
    )
    .delete(
        requireRoles(RECRUITER, ADMIN),
        applicationController.deleteApplications
    );

router
    .route('/:id')
    .get(
        requireRoles(RECRUITER, ADMIN, CANDIDATE, REVIEWER),
        applicationController.getApplicationsById
    )
    .patch(requireRoles(ADMIN), applicationController.updateApplication);

router.post(
    '/:id/set-reviewer',
    requireRoles(ADMIN, RECRUITER),
    applicationController.setReviewer
);

module.exports = router;

const express = require('express');

const router = express.Router();

const {
    getAllSessions,
    getSession,
    createSession,
    updateSession,
    deleteSession,
} = require(`${__dirname}/../controllers/session.controller.js`);
const {
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);

router
    .route('/')
    .get(getAllSessions)
    .post(protect, restrictTo('caeq'), createSession);
router
    .route('/:id')
    .get(getSession)
    .patch(protect, restrictTo('caeq'), updateSession)
    .delete(protect, restrictTo('caeq'), deleteSession);

module.exports = router;

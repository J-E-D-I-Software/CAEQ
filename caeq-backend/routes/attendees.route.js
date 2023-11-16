const express = require('express');
const router = express.Router();
const {
    getAllAttendees,
    getAttendee,
    createAttendee,
    updateAttendee,
    deleteAttendee,
    getAttendeesByArchitect,
    getAttendeesMostRecentYears,
} = require(`${__dirname}/../controllers/attendees.controller.js`);
const { protect, restrictTo } = require(`${__dirname}/../controllers/auth.controller.js`);

router.route('/architect/:idArchitect').get(getAttendeesByArchitect);
router.route('/').get(getAllAttendees).post(protect, restrictTo('caeq'), createAttendee);

router
    .route('/:id')
    .get(getAttendee)
    .patch(protect, restrictTo('caeq'), updateAttendee)
    .delete(protect, restrictTo('caeq'), deleteAttendee);

router.route('/architect/:idArchitect').get(getAttendeesByArchitect);

router.route('/directory/:idArchitect').get(getAttendeesMostRecentYears);

module.exports = router;

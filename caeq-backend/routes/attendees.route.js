var express = require('express');
var router = express.Router();
const {
    getAllAttendees,
    getAttendee,
    createAttendee,
    updateAttendee,
    deleteAttendee,
} = require(`${__dirname}/../controllers/attendees.controller.js`);
const { protect, restrictTo } = require(`${__dirname}/../controllers/auth.controller.js`);

router.route('/').get(getAllAttendees).post(protect, restrictTo('caeq',), createAttendee);

router
    .route('/:id')
    .get(getAttendee)
    .patch(protect, restrictTo('caeq'), updateAttendee)
    .delete(protect, restrictTo('caeq'), deleteAttendee);

module.exports = router;

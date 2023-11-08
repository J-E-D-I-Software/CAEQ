const factory = require('./handlerFactory.controller');
const catchAsync = require('../utils/catchAsync');
const Course = require('../models/course.model');
const Inscription = require('../models/inscription.model');
const Session = require('../models/session.model');

exports.getAllCourses = factory.getAll(Course);
exports.getCourse = factory.getOne(Course);
exports.createCourse = factory.createOne(Course);
exports.updateCourse = factory.updateOne(Course);
exports.deleteCourse = factory.deleteOne(Course);

exports.calculateAccreditedInscription = catchAsync(async (req, res, next) => {
    const inscriptions = await Inscription.find({
        course: req.params.id,
    });
    const sessions = await Session.find({ course: req.params.id });

    let total = sessions.length;
    let attendants = {};
    let minSessionAttendance = total * 0.8;

    for (let i = 0; i < sessions.length; i++) {
        sessions[i].attendees.forEach((attendee) => {
            if (attendants[attendee]) {
                attendants[attendee] += 1;
            } else {
                attendants[attendee] = 1;
            }
        });
    }

    const updatePromises = inscriptions.map((inscription) => {
        if (
            attendants[inscription.user] &&
            attendants[inscription.user] >= minSessionAttendance
        ) {
            inscription.accredited = true;
        }

        return inscription.save();
    });

    await Promise.all(updatePromises);

    res.status(200).json({
        status: 'success',
        results: inscriptions.length,
        data: { document: inscriptions },
    });
});

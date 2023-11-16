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

/**
 * A function that calculates accredited inscriptions for courses.
 * To be able to do this, it is necessary to have the '.id' of the courese we are looking to calculate.
 *
 * @param {object} req - Request objetct.
 * @param {object} res - Response object.
 * @param {function} next - Next middleware function.
 */
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

    const updatedInscriptions = inscriptions.map((inscription) => {
        if (
            attendants[inscription.user] &&
            attendants[inscription.user] >= minSessionAttendance
        ) {
            inscription.accredited = true;
        } else {
            inscription.accredited = false;
        }

        return inscription.save();
    });

    await Promise.all(updatedInscriptions);

    const accreditedInscriptions = await Inscription.find({
        course: req.params.id,
    }).populate([
        { path: 'user', select: 'email fullName collegiateNumber' }, // You can select the user fields you need
        {
            path: 'course',
            select: 'courseName teachers modality description topics',
        }, // Include fields from the course model
    ]);

    res.status(200).json({
        status: 'success',
        results: accreditedInscriptions.length,
        data: { documents: accreditedInscriptions },
    });
});

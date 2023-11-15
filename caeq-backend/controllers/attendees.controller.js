const factory = require('./handlerFactory.controller');
const Attendee = require('../models/attendees.model');
const Gathering = require('../models/gathering.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllAttendees = factory.getAll(Attendee, 'idArchitect');
exports.getAttendee = factory.getOne(Attendee);
exports.createAttendee = factory.createOne(Attendee);
exports.updateAttendee = factory.updateOne(Attendee);
exports.deleteAttendee = factory.deleteOne(Attendee);

exports.getAttendeesByArchitect = catchAsync(async (req, res) => {
    try {
        const { idArchitect } = req.params;

        //Search for attendances that match the architect's ID and populate the 'idGathering' field to obtain gathering data
        const attendees = await Attendee.find({ idArchitect }).populate({
            path: 'idGathering',
            model: Gathering,
        });

        res.status(200).json({
            status: 'success',
            results: attendees.length,
            data: { attendees },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar asistencias.',
        });
    }
});

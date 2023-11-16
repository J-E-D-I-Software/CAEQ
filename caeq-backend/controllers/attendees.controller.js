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
 
exports.getAttendeesMostRecentYears = async (req, res) => {
    try {
        const { idArchitect } = req.params;

        const attendees = await Attendee.find({ idArchitect }).populate({ path: 'idGathering', model: Gathering });

        const currentYear = new Date().getFullYear();
        const mostRecentYears = new Map();
        mostRecentYears.set(currentYear, 0)
        mostRecentYears.set(currentYear - 1, 0)
        mostRecentYears.set(currentYear - 2, 0)
        

        attendees.forEach((attendee) => {
            const yearToNumber = parseInt(attendee.idGathering.year)
            if (mostRecentYears.has(yearToNumber)) {
                mostRecentYears.set(yearToNumber, mostRecentYears.get(yearToNumber) + 1)
            }
        });

        const yearCount = {}
        yearCount[currentYear] = mostRecentYears.get(currentYear)
        yearCount[currentYear - 1] = mostRecentYears.get(currentYear - 1)
        yearCount[currentYear - 2] = mostRecentYears.get(currentYear - 2)

        res.status(200).json({
            status: 'success',
            results: 3,
            data: {yearCount, id: idArchitect},
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar asistencias.',
        });
    }
};


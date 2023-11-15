const factory = require('./handlerFactory.controller');
const Attendee = require('../models/attendees.model');
const Gathering = require('../models/gathering.model');


exports.getAllAttendees = factory.getAll(Attendee, 'idArchitect');
exports.getAttendee = factory.getOne(Attendee);
exports.createAttendee = factory.createOne(Attendee);
exports.updateAttendee = factory.updateOne(Attendee);
exports.deleteAttendee = factory.deleteOne(Attendee);
exports.getAttendeesByArchitect = async (req, res) => {
    try {
        const { idArchitect } = req.params;

       //Search for attendances that match the architect's ID and populate the 'idGathering' field to obtain gathering data
        const attendees = await Attendee.find({ idArchitect }).populate({ path: 'idGathering', model: Gathering });

        if (attendees.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontraron asistencias para el arquitecto especificado.',
            });
        }

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
};
 
exports.getAttendeesMostRecentYears = async (req, res) => {
    try {
        const { idArchitect } = req.params;

        const attendees = await Attendee.find({ idArchitect }).populate({ path: 'idGathering', model: Gathering });

        const currentYear = new Date().getFullYear();

        const mostRecentYearsAttendees = attendees.map((attendee) => {
            const mostRecentYears = new Set();

            if (attendee.idGathering) {
                const asistencia = attendee.idGathering;
                if (asistencia.year) {
                    const gatheringYear = parseInt(asistencia.year, 10);
                    if (gatheringYear >= currentYear -2  && gatheringYear <= currentYear) {
                        mostRecentYears.add(gatheringYear.toString());
                    }
                }
            }

            return {
                idArchitect: attendee.idArchitect,
                mostRecentYears: Array.from(mostRecentYears).slice(0, 3).map(Number),
            };
        });

        res.status(200).json({
            status: 'success',
            results: mostRecentYearsAttendees.length,
            data: { mostRecentYearsAttendees },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar asistencias.',
        });
    }
};


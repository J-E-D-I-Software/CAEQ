const factory = require('./handlerFactory.controller');
const Attendee = require('../models/attendees.model');

exports.getAllAttendees = factory.getAll(Attendee);
exports.getAttendee = factory.getOne(Attendee);
exports.createAttendee = factory.createOne(Attendee);
exports.updateAttendee = factory.updateOne(Attendee);
exports.deleteAttendee = factory.deleteOne(Attendee);

exports.getAttendeesByArchitect = async (req, res) => {
    try {
        // Extrae el ID del arquitecto de los parámetros de la ruta
        const { idArchitect } = req.params; 
        // Realiza la búsqueda de asistencias que coincidan con el ID del arquitecto
        const attendees = await Attendee.find({ idArchitect });

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

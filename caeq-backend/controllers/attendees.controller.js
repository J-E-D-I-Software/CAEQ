const factory = require('./handlerFactory.controller');
const Attendee = require('../models/attendees.model');

exports.getAllAttendees = factory.getAll(Attendee);
exports.getAttendee = factory.getOne(Attendee);
exports.createAttendee = factory.createOne(Attendee);
exports.updateAttendee = factory.updateOne(Attendee);
exports.deleteAttendee = factory.deleteOne(Attendee);

const factory = require('./handlerFactory.controller');
const roomOffer = require('../models/roomOffer.model');
const Log = require('../models/log.model');

exports.getAllRooms = factory.getAll(roomOffer);
exports.getRoom = factory.getOne(roomOffer);
exports.createRoom = factory.createOne(roomOffer);
exports.updateRoom = factory.updateOne(roomOffer);
exports.deleteRoom = factory.deleteOne(roomOffer);

exports.getAllLogs = factory.getAll(Log);
exports.getLog = factory.getOne(Log);
exports.createLog = factory.createOne(Log);
exports.updateLog = factory.updateOne(Log);
exports.deleteLog = factory.deleteOne(Log);
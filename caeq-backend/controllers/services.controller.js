const factory = require('./handlerFactory.controller');
const roomOffer = require('../models/roomOffer.model');

exports.getAllRooms = factory.getAll(roomOffer);
exports.getRoom = factory.getOne(roomOffer);
exports.createRoom = factory.createOne(roomOffer);
exports.updateRoom = factory.updateOne(roomOffer);
exports.deleteRoom = factory.deleteOne(roomOffer);

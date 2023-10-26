const factory = require('./handlerFactory.controller');
const Gathering = require('../models/gathering.model');

exports.getAllGatherings = factory.getAll(Gathering);
exports.getGathering = factory.getOne(Gathering);
exports.createGathering = factory.createOne(Gathering);
exports.updateGathering = factory.updateOne(Gathering);
exports.deleteGathering = factory.deleteOne(Gathering);

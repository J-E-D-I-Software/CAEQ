const factory = require('./handlerFactory.controller');
const ArchitectUser = require('../models/architect.user.model');

exports.getAllArchitectUsers = factory.getAll(ArchitectUser);
exports.getArchitectUser = factory.getOne(ArchitectUser);
exports.createArchitectUser = factory.createOne(ArchitectUser);
exports.updateArchitectUser = factory.updateOne(ArchitectUser);
exports.deleteArchitectUser = factory.deleteOne(ArchitectUser);

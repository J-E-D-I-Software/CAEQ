const factory = require('./handlerFactory.controller');
const Session = require('../models/session.model');

exports.getAllSessions = factory.getAll(Session);
exports.getSession = factory.getOne(Session);
exports.createSession = factory.createOne(Session);
exports.updateSession = factory.updateOne(Session);
exports.deleteSession = factory.deleteOne(Session);

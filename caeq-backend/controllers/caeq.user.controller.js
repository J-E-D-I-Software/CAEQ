const factory = require('./handlerFactory.controller');
const CaeqUser = require('../models/caeq.user.model');

exports.getAllCaeqUsers = factory.getAll(CaeqUser);
exports.getCaeqUser = factory.getOne(CaeqUser);
exports.createCaeqUser = factory.createOne(CaeqUser);
exports.updateCaeqUser = factory.updateOne(CaeqUser);
exports.deleteCaeqUser = factory.deleteOne(CaeqUser);

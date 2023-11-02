const factory = require('./handlerFactory.controller');
const Specialty = require('../models/specialty.model');

exports.getAllSpecialties = factory.getAll(Specialty);
exports.getSpecialty = factory.getOne(Specialty);
exports.createSpecialty = factory.createOne(Specialty);
exports.updateSpecialty = factory.updateOne(Specialty);
exports.deleteSpecialty = factory.deleteOne(Specialty);
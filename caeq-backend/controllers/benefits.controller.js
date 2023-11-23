const factory = require('./handlerFactory.controller');
const benefits = require('../models/benefits.model');

exports.getAllBenefits = factory.getAll(benefits);
exports.getBenefit = factory.getOne(benefits);
exports.createBenefit = factory.createOne(benefits);
exports.updateBenefit = factory.updateOne(benefits);
exports.deleteBenefit = factory.deleteOne(benefits);

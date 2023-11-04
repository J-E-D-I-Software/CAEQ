const factory = require('./handlerFactory.controller');
const ArchitectUser = require('../models/architect.user.model');
const APIFeatures = require(`../utils/apiFeatures`);

exports.getAllArchitectUsers = factory.getAll(ArchitectUser, 'specialties');
exports.getArchitectUser = factory.getOne(ArchitectUser, 'specialties');
exports.createArchitectUser = factory.createOne(ArchitectUser);
exports.updateArchitectUser = factory.updateOne(ArchitectUser);
exports.deleteArchitectUser = factory.deleteOne(ArchitectUser);

/**
 * This is a function that gets all architects with authorizationToShareInfo set to true.
 */
exports.getAllPublicArchitectUsers = async (req, res) => {
    let filter = {};
    let query = ArchitectUser.find({
        authorizationToShareInfo: true,
    }).select('fullName DRONumber cellphone specialty linkCV email');

    const features = new APIFeatures(query, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const documents = await features.query;

    res.status(200).json({
        status: 'success',
        results: documents.length,
        data: { documents },
    });
};

const factory = require('./handlerFactory.controller');
const ArchitectUser = require('../models/architect.user.model');

exports.getAllArchitectUsers = factory.getAll(ArchitectUser);
exports.getArchitectUser = factory.getOne(ArchitectUser);
exports.createArchitectUser = factory.createOne(ArchitectUser);
exports.updateArchitectUser = factory.updateOne(ArchitectUser);
exports.deleteArchitectUser = factory.deleteOne(ArchitectUser);

/**
 * This is a function that gets all architects with authorizationToShareInfo set to true.
 */
exports.getAllPublicArchitectUsers = async (req, res, next) => {
    let query = ArchitectUser.find({
        authorizationToShareInfo: true,
    }).select('fullName DRONumber cellphone specialty linkCV email');

    const documents = await query;

    res.status(200).json({
        status: 'success',
        results: documents.length,
        data: {
            documents,
        },
    });
};

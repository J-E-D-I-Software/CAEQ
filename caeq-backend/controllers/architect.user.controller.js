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
    }).select(
        'fullName collegiateNumber DRONumber specialty cellphone email linkCV'
    );

    // query.populate("specialty");

    const documents = await query;

    if (!documents || documents.length === 0) {
        const error = new AppError('No se encontraron', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        data: {
            documents,
        },
    });
};

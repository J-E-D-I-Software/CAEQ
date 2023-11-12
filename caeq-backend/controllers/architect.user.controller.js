const factory = require('./handlerFactory.controller');
const ArchitectUser = require('../models/architect.user.model');
const RegisterRequest = require('../models/regiesterRequests.model');
const APIFeatures = require(`../utils/apiFeatures`);
const catchAsync = require('../utils/catchAsync');

exports.getAllArchitectUsers = factory.getAll(ArchitectUser, 'specialties');
exports.getArchitectUser = factory.getOne(ArchitectUser, 'specialties');
exports.createArchitectUser = factory.createOne(ArchitectUser);
exports.updateArchitectUser = factory.updateOne(ArchitectUser);
exports.deleteArchitectUser = factory.deleteOne(ArchitectUser);

/**
 * This is a function that gets all architects with authorizationToShareInfo set to true.
 */
exports.getAllPublicArchitectUsers = catchAsync(async (req, res) => {
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
});

/**
 * Accepts an architect user's request to become a member.
 *
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} A Promise that resolves when the operation is complete.
 * @throws {AppError} If the request cannot be processed.
 *
 * @example
 * // Example usage:
 * acceptArchitectUser(req, res, next);
 */
exports.acceptArchitectUser = catchAsync(async (req, res, next) => {
    const architectId = req.params.id;

    const architect = (
        await ArchitectUser.find({ _id: architectId }).select({
            verified: 1,
            fullName: 1,
            email: 1,
        })
    )[0];
    if (!architect || architect.verified === true) {
        return next(
            new AppError('No se puede realizar esta petición en este administrador.', 400)
        );
    }

    await ArchitectUser.findByIdAndUpdate(architectId, { verified: true });

    // Uncomment after emails after payed
    try {
        await new Email(architect).sendAdminAccepted();
    } catch (error) {
        return next(
            new AppError(
                'Hemos tenido problemas enviando un correo de verificacion. El usuario ha sido verificado.',
                500
            )
        );
    }

    res.status(200).json({
        status: 'success',
        message: 'Arquitecto verificado. El usuario ahora cuenta con acceso al portal.',
    });
});

/**
 * Rejects a Architect user's request to become a member and deletes the request.
 *
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<void>} A Promise that resolves when the operation is complete.
 *
 * @example
 * // Example usage:
 * rejectArchitectUser(req, res, next);
 */
exports.rejectArchitectUser = catchAsync(async (req, res, next) => {
    const architectId = req.params.id;

    const architect = await ArchitectUser.findByIdAndDelete(architectId);

    // Uncomment after emails after payed
    try {
        await new Email(architect).sendAdminRejected();
    } catch (error) {
        return next(
            new AppError(
                'Hemos tenido problemas enviando un correo de verificacion. El usuario ha sido eliminado.',
                500
            )
        );
    }

    res.status(200).json({
        status: 'success',
        message: 'Solicitud de acceso al sistema rechazada. Se ha eliminado la petición.',
    });
});

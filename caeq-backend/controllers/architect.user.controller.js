const factory = require('./handlerFactory.controller');
const ArchitectUser = require('../models/architect.user.model');
const RegisterRequest = require('../models/regiesterRequests.model');
const APIFeatures = require(`../utils/apiFeatures`);
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

exports.getAllArchitectUsers = factory.getAll(ArchitectUser, 'specialties');
exports.getAllRegistrationRequests = factory.getAll(RegisterRequest, [
    'newInfo',
    'overwrites',
]);
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
    })
        .select('fullName DRONumber cellphone specialties linkCV email')
        .populate('specialties');

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
    const registrationRequestId = req.params.id;

    const registerRequest = await RegisterRequest.findById(
        registrationRequestId
    ).populate({
        path: 'newInfo',
        select: '-_id -email -isLegacy -overwritten -collegiateNumber -isRequest +password',
    });

    if (!registerRequest) {
        return next(new AppError('La petición de registro ya no existe.', 400));
    }

    const newArchitectInfo = registerRequest.newInfo;

    await ArchitectUser.findByIdAndUpdate(registerRequest.overwrites, {
        email: newArchitectInfo.newEmail,
        isLegacy: true,
        overwritten: true,
        collegiateNumber: registerRequest.architectNumber,
        isRequest: false,
        ...newArchitectInfo._doc,
    });

    const registerRequestNewInfo = await RegisterRequest.findById(registrationRequestId);
    await ArchitectUser.findByIdAndDelete(registerRequestNewInfo.newInfo);

    await RegisterRequest.findByIdAndDelete(registrationRequestId);

    // Uncomment after emails are payed
    try {
        newArchitectInfo.email = newArchitectInfo.newEmail;
        await new Email(newArchitectInfo).sendArchitectAccepted();
    } catch (error) {
        // Production logging
        console.log(error);
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
    const registrationRequestId = req.params.id;

    const registerRequest = await RegisterRequest.findById(
        registrationRequestId
    ).populate('newInfo');

    if (!registerRequest) {
        return next(new AppError('La petición de registro ya no existe.', 400));
    }

    await ArchitectUser.findByIdAndDelete(registerRequest.newInfo._id);

    await RegisterRequest.findByIdAndDelete(registrationRequestId);

    // Uncomment after emails are payed
    try {
        registerRequest.newInfo.email = registerRequest.newInfo.newEmail;
        await new Email(registerRequest.newInfo).sendArchitectRejected();
    } catch (error) {
        // Production logging
        console.log(error);
    }

    res.status(200).json({
        status: 'success',
        message: 'Solicitud eliminada. El usuario no fue aceptado en el portal.',
    });
});

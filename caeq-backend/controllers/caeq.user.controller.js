const factory = require('./handlerFactory.controller');
const CaeqUser = require('../models/caeq.user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

exports.getAllCaeqUsers = factory.getAll(CaeqUser);
exports.getCaeqUser = factory.getOne(CaeqUser);
exports.createCaeqUser = factory.createOne(CaeqUser);
exports.updateCaeqUser = factory.updateOne(CaeqUser);
exports.deleteCaeqUser = factory.deleteOne(CaeqUser);

/**
 * Accepts a CAEQ user's request to become an administrator.
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
 * acceptCaeqUser(req, res, next);
 */
exports.acceptCaeqUser = catchAsync(async (req, res, next) => {
    const adminId = req.body.admin;

    const caeqUser = (
        await CaeqUser.find({ _id: adminId }).select({
            verified: 1,
            fullName: 1,
            email: 1,
        })
    )[0];
    if (!caeqUser || caeqUser.verified === true) {
        return next(
            new AppError('No se puede realizar esta petición en este administrador.', 400)
        );
    }

    await CaeqUser.findByIdAndUpdate(adminId, { verified: true });

    // Uncomment after emails after payed
    try {
        await new Email(caeqUser).sendAdminAccepted();
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
        message:
            'Administrador verificado. El usuario ahora cuenta con acceso al portal de administración.',
    });
});

/**
 * Rejects a CAEQ user's request to become an administrator and deletes the request.
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
 * rejectCaeqUser(req, res, next);
 */
exports.rejectCaeqUser = catchAsync(async (req, res, next) => {
    const adminId = req.body.admin;

    const caeqUser = await CaeqUser.findByIdAndDelete(adminId);

    // Uncomment after emails after payed
    // try {
    //     await new Email(caeqUser).sendAdminRejected();
    // } catch (error) {
    //     return next(
    //         new AppError(
    //             'Hemos tenido problemas enviando un correo de verificacion. El usuario ha sido eliminado.',
    //             500
    //         )
    //     );
    // }

    res.status(200).json({
        status: 'success',
        message: 'Solicitud de acceso al sistema rechazada. Se ha eliminado la petición.',
    });
});

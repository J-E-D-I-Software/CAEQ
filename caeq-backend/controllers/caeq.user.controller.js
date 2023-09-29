const factory = require('./handlerFactory.controller');
const CaeqUser = require('../models/caeq.user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCaeqUsers = factory.getAll(CaeqUser);
exports.getCaeqUser = factory.getOne(CaeqUser);
exports.createCaeqUser = factory.createOne(CaeqUser);
exports.updateCaeqUser = factory.updateOne(CaeqUser);
exports.deleteCaeqUser = factory.deleteOne(CaeqUser);

exports.acceptCaeqUser = catchAsync(async (req, res, next) => {
    const adminId = req.body.admin;

    const caeqUser = (await CaeqUser.find({ _id: adminId }).select({ verified: 1 }))[0];
    if (!caeqUser || caeqUser.verified === true) {
        return next(
            new AppError('No se puede realizar esta petición en este administrador.', 400)
        );
    }

    await CaeqUser.findByIdAndUpdate(adminId, { verified: true });

    res.status(200).json({
        status: 'success',
        message:
            'Administrador verificado. El usuario ahora cuenta con acceso al portal de administración.',
    });
});

exports.rejectCaeqUser = catchAsync(async (req, res, next) => {
    const adminId = req.body.admin;

    await CaeqUser.findByIdAndDelete(adminId);

    res.status(200).json({
        status: 'success',
        message: 'Solicitud de acceso al sistema rechazada. Se ha eliminado la petición.',
    });
});

const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory.controller');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const Architect = require('../models/architect.user.model');

exports.sendToEveryone = catchAsync(async (req, res, next) => {
    const { subject, message, imageUrl } = req.body; // Asunto, Cuerpo, Imagen

    if (!subject || !message) {
        return next(new AppError('Por favor ingresa un asunto y un mensaje.', 400));
    }

    if (message.length > 10000) {
        return next(
            new AppError('El mensaje no puede superar los 10000 caracteres.', 400)
        );
    }

    try {
        const addressee = await Architect.find({ email: { $ne: null } });
        console.log('addressee', addressee);
        await Email.sendAnouncementToEveryone(addressee, subject, message, imageUrl);
    } catch (error) {
        console.log('error email controller', error);
        return next(new AppError('Hubo un error al enviar los correos.', 500));
    }

    res.status(200).json({
        status: 'success',
        message: 'Correo enviado a todos los usuarios.',
    });
});

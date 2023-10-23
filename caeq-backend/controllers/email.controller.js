const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory.controller');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const Architect = require('../models/architect.user.model');


exports.sendToEveryone = catchAsync(async (req, res, next) => {
    const addressee = await factory.getAll(Architect)
    const { subject, message, emailImage } = req.body; // Asunto, Cuerpo, Imagen
    const { user } = req;

    if (!subject || !message) {
        return next(new AppError('Por favor ingresa un asunto y un mensaje.', 400));
    }

    const email = new Email({
        addressee,
        subject,
        message,
        emailImage,
    });

    try {
        await email.sendToEveryone();
    } catch (error) {
        console.log("error email controller",error);
        return next(new AppError('Hubo un error al enviar los correos.', 500));
    }
    

    res.status(200).json({
        status: 'success',
        message: 'Correo enviado a todos los usuarios.',
    });
});

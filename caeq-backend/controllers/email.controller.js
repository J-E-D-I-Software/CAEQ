const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory.controller");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const Architect = require("../models/architect.user.model");

exports.sendToEveryone = catchAsync(async (req, res, next) => {
    console.log("req.body", req.body); //Ya llegamos a
    const { subject, message, imageUrl } = req.body; // Asunto, Cuerpo, Imagen

    if (!subject || !message) {
        return next(new AppError("Por favor ingresa un asunto y un mensaje.", 400));
    }

    try {
        const addressee = await Architect.find({ email: { $ne: null } });
        
        //const addressee = await Architect.find({ email: { $eq: 'cvjj1504@outlook.com'} });
        console.log("addressee", addressee);
        await Email.sendAnouncementToEveryone(addressee, subject, message, imageUrl);
    } catch (error) {
        console.log("error email controller", error);
        return next(new AppError("Hubo un error al enviar los correos.", 500));
    }

    res.status(200).json({
        status: "success",
        message: "Correo enviado a todos los usuarios.",
    });
});

exports.sendPaymentAcceptedAlert = catchAsync(async (req, res, next) => {
    console.log('soyese', req.body)
    const { user, course} = req.body;

    try {
        const response = await Email.sendPaymentAcceptedAlert(user, course)
    } catch (error) {
        console.log('error email controller', error)
        return next(new AppError('Hubo un problema al enviar el correo.'))
    }
    
    res.status(200).json({
        status: 'success',
        message: 'Correo enviado con éxito.'
    });
});
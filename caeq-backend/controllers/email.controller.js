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


exports.acceptPayment = catchAsync(async (req, res, next) => {
    console.log("req.body", req.body); //Ya llegamos al controlador
    const { paymentId, user, status } = req.body; // Id del pago

    if (!paymentId) {
        return next(new AppError("Por favor ingresa un id de pago.", 400));
    }

    if (!user) {
        return next(new AppError("Por favor ingresa un id de usuario.", 400));
    }

    if (!status) {
        return next(new AppError("Por favor ingresa un status.", 400));
    }
    
    
});

exports.declinePayment = catchAsync(async (req, res, next) => {
    console.log("req.body", req.body); //Ya llegamos al controlador
    const { paymentId, user, status } = req.body; // Id del pago

    if (!paymentId) {
        return next(new AppError("Por favor ingresa un id de pago.", 400));
    }
    if (!user) {
        return next(new AppError("Por favor ingresa un id de usuario.", 400));
    }
    if (!status) {
        return next(new AppError("Por favor ingresa un status.", 400));
    }
    
});


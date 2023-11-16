const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory.controller');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const Course = require('../models/course.model');
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
    let addressee;
    try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
            console.log('NODE_ENV', process.env.NODE_ENV)
            addressee = await Architect.find({
                email: { $eq: 'josh152002@outlook.com' },
            });
            console.log(addressee)
        }
            // addressee = await Architect.find({ email: { $ne: null } });
        
        console.log('addressee', addressee)
        const email = await Email.sendAnouncementToEveryone(addressee, subject, message, imageUrl);

        console.log('email', email);
    } catch (error) {
        return next(new AppError('Hubo un error al enviar los correos.', 500));
    }

    res.status(200).json({
        status: 'success',
        message: 'Correo enviado a todos los usuarios.',
    });
});

exports.sendEmailNotification = catchAsync(async (req, res, next) => {
    try{
        if (process.env.NODE_ENV === 'dev') {
            const addressee = await Architect.find({
                email: { $eq: 'cvjj1504@outlook.com' },
            });
        } else {
            const addressee = await Architect.find({ anuuity: { $eq: true } });
        }

        const course = await Course.find().sort({createdAt: -1})

        console.log('addressee', addressee);
        console.log('Course', course);
        // const email = await Email.sendNewCourseCreatedEmail(addressee, req.body)
        

    }catch(error){
        return next(new AppError('Hubo un error al enviar los correos.', 500));
    }

    res.status(200).json({
        status: 'success',
        message: 'Correo enviado a todos los usuarios.',
    });
});

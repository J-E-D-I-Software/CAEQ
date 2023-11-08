const factory = require('./handlerFactory.controller');
const Inscription = require('../models/inscription.model');
const Course = require('../models/course.model');
const Session = require('../models/session.model');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const AppError = require('../utils/appError');

exports.getAllInscriptions = factory.getAll(Inscription, [
    { path: 'user', select: 'email fullName collegiateNumber' }, // You can select the user fields you need
    {
        path: 'course',
        select: 'courseName teachers modality description topics',
    }, // Include fields from the course model
]);

exports.getInscription = factory.getOne(Inscription, ['user', 'course']);

exports.createInscription = factory.createOne(Inscription);
exports.deleteInscription = factory.deleteOne(Inscription);

exports.inscribeTo = catchAsync(async (req, res, next) => {
    const courseId = req.body.courseId;

    if (!courseId) {
        return next(
            new AppError(
                'Envía la clave del curso para poder inscribirte.',
                400
            )
        );
    }

    const course = await Course.findById(courseId);

    if (!course) {
        return next(
            new AppError('No se encontró ningún curso con esta clave.', 404)
        );
    }

    if (course.pricing === 'Pagado') {
        return next(
            new AppError(
                'Necesitas pagar por este curso para inscribirte.',
                400
            )
        );
    }

    if (course.startDate < new Date()) {
        return next(
            new AppError(
                'Este curso ya ha iniciado, no puedes inscribirte.',
                400
            )
        );
    }

    if (course.capacity === 0) {
        return next(
            new AppError('Ya no hay espacio disponible en este curso.', 400)
        );
    }

    const existingInscription = await Inscription.findOne({
        course: courseId,
        user: req.user._id,
    });

    if (existingInscription) {
        return next(new AppError('Ya te has inscrito a este curso.', 400));
    }

    course.capacity -= 1;
    await course.save();

    await Inscription.create({
        course: courseId,
        user: req.user._id,
    });

    /* try {
        await new Email(
            req.user,
            process.env.LANDING_URL,
            course
        ).sendInscriptionAlert();
    } catch (error) {
        return next(
            new AppError('Hemos tenido problemas enviando un correo de confirmación.', 500)
        );
    }*/

    res.status(200).json({
        status: 'success',
        data: { document: course },
    });
});

exports.myInscriptions = catchAsync(async (req, res, next) => {
    const inscriptions = await Inscription.find({
        user: req.user._id,
    })
        .populate('course')
        .sort({ updatedAt: -1 });

    res.status(200).json({
        status: 'success',
        results: inscriptions.length,
        data: { document: inscriptions },
    });
});

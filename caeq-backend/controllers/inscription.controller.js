const factory = require('./handlerFactory.controller');
const Inscription = require('../models/inscription.model');
const Course = require('../models/course.model');
const ArchitectUser = require('../models/architect.user.model');
const Session = require('../models/session.model');
const APIFeatures = require(`../utils/apiFeatures`);
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const AppError = require('../utils/appError');
const DateRange = require('../utils/dateRangeMap');

exports.getAllInscriptions = factory.getAll(Inscription, [
    { path: 'user', select: 'email fullName collegiateNumber idArchitect' }, // You can select the user fields you need
    {
        path: 'course',
        select: 'courseName teachers modality description idCourse ',
    }, // Include fields from the course model
]);

exports.getInscription = factory.getOne(Inscription, ['user', 'course']);

exports.createInscription = factory.createOne(Inscription);
exports.deleteInscription = factory.deleteOne(Inscription);

exports.inscribeTo = catchAsync(async (req, res, next) => {
    const courseId = req.body.courseId;

    if (!courseId) {
        return next(
            new AppError('Envía la clave del curso para poder inscribirte.', 400)
        );
    }

    const course = await Course.findById(courseId);

    if (!course) {
        return next(new AppError('No se encontró ningún curso con esta clave.', 404));
    }

    if (course.pricing === 'Pagado') {
        return next(
            new AppError('Necesitas pagar por este curso para inscribirte.', 400)
        );
    }

    if (course.startDate < new Date()) {
        return next(
            new AppError('Este curso ya ha iniciado, no puedes inscribirte.', 400)
        );
    }

    if (course.capacity === 0) {
        return next(new AppError('Ya no hay espacio disponible en este curso.', 400));
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

    res.status(200).json({
        status: 'success',
        data: { document: course },
    });
});

exports.myInscriptions = catchAsync(async (req, res) => {
    let query = Course.find();
    const features = new APIFeatures(query, req.query).filter().limitFields().paginate();
    const documents = await features.query;
    const courseIds = documents.map((doc) => doc._id);

    let inscriptions = await Inscription.find({
        user: req.user._id,
        course: { $in: courseIds },
    })
        .populate('course')
        .sort({ updatedAt: -1 });

    // Obtener los IDs de los cursos a los que se ha inscrito el usuario
    const courseIdsFromInscriptions = inscriptions.map(
        (inscription) => inscription.course
    );
    // Buscar las sesiones de los cursos a los que se ha inscrito el usuario, devuelve todos los ids d todos los attendes
    const sessions = await Session.find({ course: { $in: courseIdsFromInscriptions } });
    // Obtener los IDs de los cursos a los que se ha inscrito el usuario

    res.status(200).json({
        status: 'success',
        results: inscriptions.length,

        data: { document: inscriptions, sessions },
    });
});

exports.myCourseHours = catchAsync(async (req, res, next) => {
    const inscriptions = await Inscription.find({
        user: req.params.id,
    }).populate('course user');

    const dateMap = new DateRange();

    inscriptions.forEach((inscription) => {
        if (inscription.accredited == true) {
            dateMap.add(inscription.course.endDate, inscription.course.numberHours);
        }
    });

    const user = await ArchitectUser.findById(req.params.id);

    dateMap.add(new Date(2023, 4, 15), user._doc.capacitationHours);

    const allYears = dateMap.getYears();

    res.status(200).json({
        status: 'success',
        results: allYears.length,
        data: { documents: allYears },
    });
});

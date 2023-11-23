const factory = require('./handlerFactory.controller');
const ArchitectUser = require('../models/architect.user.model');
const Attendee = require('../models/attendees.model');
const Gathering = require('../models/gathering.model');
const Inscription = require('../models/inscription.model');
const RegisterRequest = require('../models/regiesterRequests.model');
const APIFeatures = require(`../utils/apiFeatures`);
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const DateRange = require('../utils/dateRangeMap');

// exports.getAllArchitectUsers = factory.getAll(ArchitectUser, 'specialties');
exports.getAllArchitectUsers = catchAsync(async (req, res) => {
    try {
        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        let filter = {};
        let query = ArchitectUser.find(filter);
        query.populate('specialties');
        const requiresRights = Object.keys(req.query).includes('rights');
        const rightFiltering = req.query.rights === 'true';

        // filter
        const queryObj = { ...req.query };
        const excludeFields = [
            'page',
            'sort',
            'limit',
            'fields',
            'currentRights',
            'rights',
        ];

        excludeFields.forEach((el) => delete queryObj[el]);

        // ADVANCED FILTERING
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(
            // To allow more mongoose commands add the name of the command to the regular expression
            /\b(gte|gt|lte|lt|regex|np|in )\b/g,
            (match) => `$${match}`
        );
        queryString = queryString.replace(
            /"\$regex":"([^"]*)"/g,
            '"$regex": "$1", "$options": "i"'
        );
        let filteredQuery = JSON.parse(queryString);

        query.find(filteredQuery);

        // SORTING
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query.sort(sortBy);
        } else {
            query.sort('-createdAt _id');
        }

        // FIELD LIMITING
        if (req.query.fields) {
            const fields = req.query.fields
                .split(',')
                .filter((val) => val !== 'password' && val !== 'passwordConfirm')
                .join(' ');
            query.select(fields);
        }

        // PAGINATION IF NO RIGHTS FILTERING
        if (!requiresRights) {
            query.skip(skip).limit(limit);
        }

        // EXECUTE QUERY
        let documents = await query;
        documents = await Promise.all(
            documents.map(async (doc) => {
                const hasRights = await doc.currentRights;
                doc.rights = hasRights;
                return doc;
            })
        );
        if (requiresRights) {
            documents = documents.filter((doc) => {
                return doc.rights === rightFiltering;
            });
        }

        if (requiresRights) {
            documents = documents.slice(skip, skip + limit);
        }

        documents = await Promise.all(
            documents.map(async (doc) => {
                const latestAssemblies = await getUserLatestAssemblies(doc._id);
                const latestHours = await getUserLatestHours(doc._id);
                return { ...doc._doc, ...latestAssemblies, ...latestHours };
            })
        );

        res.status(200).json({
            status: 'success',
            results: documents.length,
            data: { documents },
        });
    } catch (error) {
        console.log(error);
    }
});

exports.getAllRegistrationRequests = factory.getAll(RegisterRequest, [
    'newInfo',
    'overwrites',
]);
exports.getArchitectUser = factory.getOne(ArchitectUser, 'specialties');
exports.getArchitectUser = catchAsync(async (req, res, next) => {
    let query = ArchitectUser.findOne({ _id: req.params.id });

    query.populate('specialties');
    const document = await query;

    if (!document) {
        const error = new AppError('No document found with that ID', 404);
        return next(error);
    }

    const hasRights = await document.currentRights;
    const totalHours = await document.totalHours;
    const { totalGatheringAttendeesPresential, totalGatheringAttendees } =
        await document.lastYearAttendees;

    document.rights = hasRights;
    const latestAssemblies = await getUserLatestAssemblies(document._id);
    const latestHours = await getUserLatestHours(document._id);

    res.status(200).json({
        status: 'success',
        data: {
            document: {
                ...document._doc,
                ...latestAssemblies,
                ...latestHours,
                totalHours,
                totalGatheringAttendeesPresential,
                totalGatheringAttendees,
            },
        },
    });
});
exports.createArchitectUser = factory.createOne(ArchitectUser);
exports.updateArchitectUser = factory.updateOne(ArchitectUser);
exports.deleteArchitectUser = factory.deleteOne(ArchitectUser);

/**
 * This is a function that gets all architects with authorizationToShareInfo set to true.
 */
exports.getAllPublicArchitectUsers = catchAsync(async (req, res) => {
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

const getUserLatestAssemblies = async (id) => {
    const attendees = await Attendee.find({ idArchitect: id }).populate({
        path: 'idGathering',
        model: Gathering,
    });

    const currentYear = new Date().getFullYear();
    const mostRecentYears = new Map();
    mostRecentYears.set(currentYear, 0);
    mostRecentYears.set(currentYear - 1, 0);
    mostRecentYears.set(currentYear - 2, 0);

    attendees.forEach((attendee) => {
        const yearToNumber = parseInt(attendee.idGathering.year);
        if (mostRecentYears.has(yearToNumber)) {
            mostRecentYears.set(yearToNumber, mostRecentYears.get(yearToNumber) + 1);
        }
    });

    const yearCount = {};
    yearCount[currentYear] = mostRecentYears.get(currentYear);
    yearCount[currentYear - 1] = mostRecentYears.get(currentYear - 1);
    yearCount[currentYear - 2] = mostRecentYears.get(currentYear - 2);

    return yearCount;
};

const getUserLatestHours = async (id) => {
    const inscriptions = await Inscription.find({
        user: id,
    }).populate('course user');

    const dateMap = new DateRange();

    inscriptions.forEach((inscription) => {
        if (inscription.accredited == true) {
            dateMap.add(inscription.course.endDate, inscription.course.numberHours);
        }
    });

    const user = await ArchitectUser.findById(id);

    dateMap.add(new Date(2023, 3, 15), user.capacitationHours);

    const allYears = dateMap.getYears();

    const myCourseHours = {};
    const currentYear = new Date().getFullYear();
    myCourseHours[`cursos${currentYear}`] = 0;
    myCourseHours[`cursos${currentYear - 1}`] = 0;
    myCourseHours[`cursos${currentYear - 2}`] = 0;
    allYears.forEach((courseHour) => {
        if (
            courseHour.startYear == currentYear ||
            courseHour.startYear == currentYear - 1 ||
            courseHour.startYear == currentYear - 2
        ) {
            myCourseHours['cursos' + courseHour.startYear] = courseHour.value;
        }
    });

    return myCourseHours;
};

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Attendees = require('./attendees.model');
const Gatherings = require('./gathering.model');
const Inscription = require('./inscription.model');
const DateRange = require('../utils/dateRangeMap');
const catchAsync = require('../utils/catchAsync');

// UPDATE TEST DATA AFTER UPDATING ARCHITECT MODEL
const ArchitectUserSchema = new mongoose.Schema({
    collegiateNumber: {
        type: Number,
        required: [true, 'Por favor dinos tu número de colegiado!'],
    },
    fullName: {
        type: String,
        required: [true, 'Por favor dinos tu nombre!'],
    },
    memberType: {
        type: String,
        enum: [
            '-',
            'Miembro de número',
            'Miembro Adherente',
            'Miembro Pasante',
            'Miembro Vitalicio',
            'Miembro Honorario',
        ],
        required: [true, 'Por favor dinos qué |tipo de miembro| eres!'], //TODO: change to enum
    },
    classification: {
        type: String,
        enum: ['-', 'Expresidente', 'Docente', 'Convenio', 'Ninguno'],
        required: [true, 'Por favor dinos tu clasificación!'],
    },
    DRONumber: {
        type: String,
        required: [false],
    },
    authorizationToShareInfo: {
        type: Boolean,
        default: false,
        required: [true, 'Por favor dinos si autorizas compartir tu información'],
    },
    lifeInsurance: {
        type: Boolean,
        required: [false],
    },
    lifeInsureID: {
        type: String,
        required: [false],
    },
    age: {
        type: Number,
        min: [0, 'Debes ser mayor de 0 años  para registrarte.'],
        max: [100, 'Debes ser menor de 100 años para registrarte.'],
        required: [false],
    },
    gender: {
        type: String,
        enum: ['Hombre', 'Mujer', 'Prefiero no decirlo'],
        required: [true, 'Por favor dinos tu género!'],
    },
    cellphone: {
        type: Number,
        required: [false],
    },
    homePhone: {
        type: Number,
        required: [false],
        maxlength: [10, 'El número de teléfono debe ser de 10 dígitos.'],
        required: [false],
    },
    officePhone: {
        type: Number,
        maxlength: [10, 'El número de teléfono debe ser de 10 dígitos.'],
        required: [false],
    },
    emergencyContact: {
        type: String,
        required: [true, 'Por favor dinos tu contacto de emergencia (nombre y número)!'],
    },
    mainProfessionalActivity: {
        type: String,
        required: [true, 'Por favor dinos tu actividad principal profesional!'],
    },
    dateOfAdmission: {
        type: Number,
        minlength: [4, 'Deben ser cuatro digitos.'],
        required: [true, 'Por favor dinos tu fecha de admisión!'],
    },
    dateOfBirth: {
        type: Date,
    },
    municipalityOfLabor: {
        type: String,
        required: [true, 'Por favor dinos tu municipio de labor!'],
    },
    linkCV: {
        type: String,
        required: [false],
    },
    linkINE: {
        type: String,
        required: [false],
    },
    linkCAEQCard: {
        type: String,
        required: [false],
    },
    linkCURP: {
        type: String,
        required: [false],
    },
    linkProfessionalLicense: {
        type: String,
        required: [false],
    },
    linkBachelorsDegree: {
        type: String,
        required: [false],
    },
    linkAddressCertificate: {
        type: String,
        required: [false],
    },
    linkBirthCertificate: {
        type: String,
        required: [false],
    },
    university: {
        type: String,
        required: [true, 'Por favor dinos tu universidad!'],
    },
    professionalLicense: {
        type: String,
        required: [true, 'Por favor dinos tu cédula profesional!'],
    },
    workAddress: {
        type: String,
        required: [true, 'Por favor dinos tu dirección de trabajo!'],
    },
    homeAddress: {
        type: String,
        required: [true, 'Por favor dinos tu dirección de casa!'],
    },
    positionsInCouncil: {
        type: String,
    },
    capacitationHours: {
        type: Number,
        default: 0,
    },
    annuity: {
        type: Boolean,
        required: [false],
    },
    specialties: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Specialty',
        },
    ],
    email: {
        type: String,
        required: [true, 'Por favor dinos tu correo!'],
        lowercase: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Necesitas un correo válido.'],
    },
    newEmail: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Por favor provee una contraseña.'],
        // Using select prevents the field from being retrieved
        minlength: [8, 'Tu contraseña debe contar con al menos 8 caracteres.'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Por favor confirma tu contraseña.'],
        validate: {
            // we want equal passwords
            validator: function (value) {
                return value === this.password;
            },
            message: 'Por favor ingresa la misma contraseña.',
        },
    },
    changedPassword: Date,
    changedPasswordToken: String,
    tokenExpirationDate: Date,
    isLegacy: {
        type: Boolean,
        default: false,
    },
    isOverwritten: {
        type: Boolean,
        default: true,
    },
    isRequest: {
        type: Boolean,
        default: false,
    },
    rights: {
        type: Boolean,
    },
});

// Indexing admin properties for optimized search
ArchitectUserSchema.index({ email: 1 });

// MIDDLEWARES
/** This is a middleware that runs before the save() or create() method. It hashes the password and sets
the passwordConfirm to undefined. */
ArchitectUserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        // Mongoose wont save a field if it has been set to undefined.
        this.passwordConfirm = undefined;
    }
    return next();
});

/** This is a middleware that runs before the save() or create() method. Checks if the password has changed
and updates the passwordChangedAt attribute. */
ArchitectUserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    else {
        this.passwordConfirm = Date.now() - 1000;
        next();
    }
});

// INSTANCE METHODS
// Instance methods will be available in all document instances.

ArchitectUserSchema.pre('validate', function (next) {
    if (this.age < 0 || this.age > 100) {
        throw new AppError('La edad debe estar entre 0 y 100', 400);
    }
    return next();
});

/** This is a method that compares the candidate password with the user password. */
ArchitectUserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    // This refers to the document. Since select is false we dont have access to password.
    return await bcrypt.compare(candidatePassword, userPassword);
};

/** Creating a password reset token and saving it in the database. */
ArchitectUserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    // We save the password reset token in the database.
    this.changedPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 10 hours
    this.tokenExpirationDate = Date.now() + 10 * 60 * 1000;

    // We return the reset token encrypted.
    return this.changedPasswordToken;
};

/** This method checks if the password has been changed after the token was issued. */
ArchitectUserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.changedPassword.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // false means the password did not change
    return false;
};

/**
 * Retrieves the accredited hours of a user based on their inscriptions and capacitation hours.
 * @async
 * @function getUserAccreditedHours
 * @param {string} id - The ID of the user to retrieve the accredited hours for.
 * @returns {Array} An array of objects representing the accredited hours for each year.
 */
ArchitectUserSchema.methods.getUserAccreditedHours = async (id) => {
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
    return allYears;
};

/** This method defines a virtual property "annuity" for the architects user model*/
ArchitectUserSchema.virtual('currentRights').get(async function () {
    try {
        const capacitationHours = await this.getUserAccreditedHours(this._id);

        // Calculate the date range for the last year
        const lastYearDate = new Date();
        lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

        // Find gatherings from the last year
        const gatherings = await Gatherings.find({
            date: { $gte: lastYearDate },
        });
        const gatheringIds = gatherings.map((gathering) => gathering._id);

        // Find attendee documents for the specific user and gatherings from the last year
        const lastYearAttended = await Attendees.find({
            idArchitect: this._id,
            idGathering: { $in: gatheringIds },
        });

        // console.log('USER', lastYearAttended, capacitationHours);

        const totalGatheringAttendees = lastYearAttended.length;
        const totalGatheringAttendeesPresential = lastYearAttended.filter(
            (attendance) => attendance.modality == 'Presencial'
        ).length;

        const thisYearTotalCapacitationHours = capacitationHours.filter(
            (capacitationHour) => capacitationHour.startYear == new Date().getFullYear()
        )[0].value;

        const annuity = this.annuity || false;

        // Check if capacitationHours are from 40 to beyond if there are 5 attendances in the last year
        // and at least 3 of them are presential and if the user is has payed the annuity
        if (
            thisYearTotalCapacitationHours >= 40 &&
            totalGatheringAttendees >= 5 &&
            totalGatheringAttendeesPresential >= 3 &&
            annuity == true
        ) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
});

ArchitectUserSchema.set('toJSON', { virtuals: true });

const ArchitectUser = mongoose.model('architect.user', ArchitectUserSchema);

module.exports = ArchitectUser;

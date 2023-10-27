const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// UPDATE TEST DATA AFTER UPDATING ARCHITECT MODEL
const ArchitectUserSchema = new mongoose.Schema({
    collegiateNumber: {
        unique: true,
        type: Number,
        required: [true, 'Por favor dinos tu número de DRO!'],
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
        enum: ['-', 'Expresidente', 'Docente', 'Convenio'],
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
        required: [true, 'Por favor dinos tu fecha de nacimiento!'],
    },
    municipalityOfLabor: {
        type: String,
        required: [true, 'Por favor dinos tu municipio de labor!'],
    },
    linkCV: {
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
        required: [true, 'Por favor dinos tus cargos en el consejo directivo!'],
    },
    capacitationHours: {
        type: Number,
        required: [false],
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

/** This method defines a virtual property "annuity" for the architects user model*/
ArchitectUserSchema.virtual('currentRights').get(function () {
    const capacitationHours = this.capacitationHours || 0;
    const annuity = this.annuity || false;

    // Check if capacitationHours are from 40 to beyond and annuity is true
    if (capacitationHours >= 40 && annuity) {
        return true;
    }
    return false;
});

const ArchitectUser = mongoose.model('architect.user', ArchitectUserSchema);

module.exports = ArchitectUser;

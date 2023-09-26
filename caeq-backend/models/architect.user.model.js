const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// UPDATE TEST DATA AFTER UPDATING ARCHITECT MODEL
const ArchitectUserSchema = new mongoose.Schema({
    collegiateNumber: {
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
            "Miembro de número",
            "Miembro Adherente",
            "Miembro Pasante",
            "Miembro Vitalicio",
            "Miembro Honorario" ],
        required: [true, 'Por favor dinos qué |tipo de miembro| eres!'] //TODO: change to enum
    },
    classification: {
        type: String,
        enum: [
            "Expresidente",
            "Docente",
            "Convenio"],
        required: [true, 'Por favor dinos tu clasificación!'],
    },
    DRONumber: {
        type: String,
        required: [true, 'Por favor dinos tu número de DRO!'],
    },
    authorizationToShareInfo: {
        type: Boolean,
        required: [true, 'Por favor dinos si tienes autorización para compartir información!'],
    },
    lifeInsurance: {
        type: Boolean,
        required: [true, 'Por favor dinos si tienes autorización para compartir información!']
    },
    lifeInsureID:{
        type: String,
        required: [true, 'Por favor dinos tu poliza de seguro de vida!']
    },
    age: {
        type: Number,
        required: [true, 'Por favor dinos tu edad!']
    },
    gender: {
        type: String,
        enum: ["Masculino", "Femenino"],
        required: [true, 'Por favor dinos tu género!']
    },
    cellphone: {
        type: Number,
        required: [true, 'Por favor dinos tu número de celular!']
    },
    homePhone: {
        type: Number,
        required: [true, 'Por favor dinos tu número de casa!']
    },
    officePhone: {
        type: Number,
        required: [true, 'Por favor dinos tu número de oficina!']
    },
    emergencyContact: {
        type: Number,
        required: [true, 'Por favor dinos tu contacto de emergencia!']
    },
    emergencyContactName: {
        type: String,
        required: [true, 'Por favor dinos el nombre de tu contacto de emergencia!']
    }, 
    mainProfessionalActivity: {
        type: String,
        required: [true, 'Por favor dinos tu actividad principal profesional!']
    },
    dateOfAdmission: {
        type: Date,
        required: [true, 'Por favor dinos tu fecha de admisión!']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Por favor dinos tu fecha de nacimiento!']
    },
    municipalityOfLabor: {
        type: String,
        required: [true, 'Por favor dinos tu municipio de labor!']
    },
    linkCV: {
        type: String,
        required: [true, 'Por favor dinos tu link de CV!']
    },
    university: {
        type: String,
        required: [true, 'Por favor dinos tu universidad!']
    },
    professionalLicense: {
        type: String,
        required: [true, 'Por favor dinos tu cédula profesional!']
    },
    workAddress: {
        type: String,
        required: [true, 'Por favor dinos tu dirección de trabajo!']
    },
    homeAddress: {
        type: String,
        required: [true, 'Por favor dinos tu dirección de casa!']
    },
    specialty: {
        type: String,
        enum: [ 
            "Corresponsable en seguridad estructural", 
            "Corresponsable en instalaciones",
            "Corresponsable en instalaciones eléctricas",
            "DUYA",
            "Dictaminador estructural", 
            "Revisor de bajo riesgo", ],
        required: [true, 'Por favor dinos tu especialidad!']
    },
    positionsInCouncil: {
        type: String,
        required: [true, 'Por favor dinos tus cargos en el consejo directivo!']
    },
    capacitationHours: {
        type: Number,
        required: [true, 'Por favor dinos tus horas de capacitación!']
    },
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
            // queremos contraseñas iguales
            validator: function (value) {
                return value === this.password;
            },
            message: 'Por favor ingresa la misma contraseña.',
        },
    },
    changedPassword: Date,
    changedPasswordToken: String,
    tokenExpirationDate: Date,
});

// Indexing admin properties for optimized search
ArchitectUserSchema.index({ email: 1 });

// MIDDLEWARES
/* This is a middleware that runs before the save() or create() method. It hashes the password and sets
the passwordConfirm to undefined. */
ArchitectUserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        // Mongoose wont save a field if it has been set to undefined.
        this.passwordConfirm = undefined;
    }
    return next();
});

/* This is a middleware that runs before the save() or create() method. Checks if the password has changed
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

/* This is a method that compares the candidate password with the user password. */
ArchitectUserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    // This refers to the document. Since select is false we dont have access to password.
    return await bcrypt.compare(candidatePassword, userPassword);
};

/* Creating a password reset token and saving it in the database. */
ArchitectUserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    // We save the password reset token in the database.
    this.changedPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 10 hours
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // We return the reset token encrypted.
    return resetToken;
};

/* This method checks if the password has been changed after the token was issued. */
ArchitectUserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.changedPassword.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // false means the password did not change
    return false;
};

const ArchitectUser = mongoose.model('architect.user', ArchitectUserSchema);

module.exports = ArchitectUser;

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const CaeqUsuarioSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: [true, 'Por favor dinos tu nombre!'],
    },
    correoElectronico: {
        type: String,
        required: [true, 'Por favor dinos tu correo!'],
        lowercase: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Necesitas un correo válido.'],
    },
    contrasena: {
        type: String,
        required: [true, 'Por favor provee una contraseña.'],
        // Using select prevents the field from being retrieved
        minlength: [8, 'Tu contraseña debe contar con al menos 8 caracteres.'],
        select: false,
    },
    confirmarContrasena: {
        type: String,
        required: [true, 'Por favor confirma tu contraseña.'],
        validate: {
            // queremos contraseñas iguales
            validator: function (value) {
                return value === this.contrasena;
            },
            message: 'Por favor ingresa la misma contraseña.',
        },
    },
    verificado: {
        type: Boolean,
        select: false,
        default: false,
    },
    contrasenaCambiada: Date,
    tokenCambioContrasena: String,
    expiracionToken: Date,
});

// Indexing admin properties for optimized search
CaeqUsuarioSchema.index({ correoElectronico: 1 });

// MIDDLEWARES
/* This is a middleware that runs before the save() or create() method. It hashes the password and sets
the passwordConfirm to undefined. */
CaeqUsuarioSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.contrasena = await bcrypt.hash(this.contrasena, 12);
        // Mongoose wont save a field if it has been set to undefined.
        this.confirmarContrasena = undefined;
    }
    return next();
});

/* This is a middleware that runs before the save() or create() method. Checks if the password has changed
and updates the passwordChangedAt attribute. */
CaeqUsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena') || this.isNew) return next();
    else {
        this.contrasenaCambiada = Date.now() - 1000;
        next();
    }
});

// INSTANCE METHODS
// Instance methods will be available in all document instances.

/* This is a method that compares the candidate password with the user password. */
CaeqUsuarioSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    // This refers to the document. Since select is false we dont have access to password.
    return await bcrypt.compare(candidatePassword, userPassword);
};

/* Creating a password reset token and saving it in the database. */
CaeqUsuarioSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    // We save the password reset token in the database.
    this.tokenCambioContrasena = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 10 hours
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // We return the reset token encrypted.
    return resetToken;
};

/* This method checks if the password has been changed after the token was issued. */
CaeqUsuarioSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.contrasenaCambiada.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // false means the password did not change
    return false;
};

const CaeqUsuario = mongoose.model('caeq.usuario', CaeqUsuarioSchema);

module.exports = CaeqUsuario;

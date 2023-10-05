const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const CaeqUserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Por favor dinos tu nombre!"],
    },
    email: {
        type: String,
        required: [true, "Por favor dinos tu correo!"],
        lowercase: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Necesitas un correo válido."],
    },
    password: {
        type: String,
        required: [true, "Por favor provee una contraseña."],
        // Using select prevents the field from being retrieved
        minlength: [8, "Tu contraseña debe contar con al menos 8 caracteres."],
        select: false,
    },
    passwordConfirm: {
        type: String,
        select: false,
        required: [true, "Por favor confirma tu contraseña."],
        validate: {
            // queremos contraseñas iguales
            validator: function (value) {
                return value === this.password;
            },
            message: "Por favor ingresa la misma contraseña.",
        },
    },
    verified: {
        type: Boolean,
        select: false,
        default: false,
    },
    changedPassword: Date,
    changedPasswordToken: String,
    tokenExpirationDate: Date,
});

// Indexing admin properties for optimized search
CaeqUserSchema.index({ email: 1 });

// MIDDLEWARES
/* This is a middleware that runs before the save() or create() method. It hashes the password and sets
the passwordConfirm to undefined. */
CaeqUserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        // Mongoose wont save a field if it has been set to undefined.
        this.passwordConfirm = undefined;
    }
    return next();
});

/* This is a middleware that runs before the save() or create() method. Checks if the password has changed
and updates the passwordChangedAt attribute. */
CaeqUserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    else {
        this.passwordConfirm = Date.now() - 1000;
        next();
    }
});

// INSTANCE METHODS
// Instance methods will be available in all document instances.

/* This is a method that compares the candidate password with the user password. */
CaeqUserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    // This refers to the document. Since select is false we dont have access to password.
    return await bcrypt.compare(candidatePassword, userPassword);
};

/* Creating a password reset token and saving it in the database. */
CaeqUserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    // We save the password reset token in the database.
    this.changedPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // 10 hours
    this.tokenExpirationDate = Date.now() + 10 * 60 * 1000;

    // We return the reset token encrypted.
    return resetToken;
};

/* This method checks if the password has been changed after the token was issued. */
CaeqUserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.changedPassword.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // false means the password did not change
    return false;
};

const CaeqUser = mongoose.model("caeq.user", CaeqUserSchema);

module.exports = CaeqUser;

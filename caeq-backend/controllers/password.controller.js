require("dotenv").config();
const CaeqUser = require("../models/caeq.user.model");
const ArchitectUser = require("../models/architect.user.model");
const Email = require("../utils/email");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const frontDomain = process.env.FRONT_DOMAIN;

/**
 * It takes a user's email, creates a reset token, saves it to the user, and sends an email with a link
 * to reset the password.
 * @param type - The type you want to use.
 * @param email - the email of the user who wants to reset their password
 * @returns Nothing.
 */
const forgotPassword = async (type, email, req, userType) => {
    // 1 get user based on posted email
    const user = await type.findOne({ email });
    if (!user) {
        throw new AppError("No existe un usuario con ese correo.", 404);
    }
    // 2 generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); // we save the new resetToken at user

    const resetURL = `${req.protocol}://${frontDomain}/${userType}/reset-password/${resetToken}`;
    console.log(resetURL);
    // if it fails, we want to delete that token
    try {
        await new Email(user, resetURL).sendPasswordReset();
    } catch (err) {
        user.passwordResetExpires = undefined;
        user.passwordResetToken = undefined;
        await user.save({ validateBeforeSave: false });
        throw new AppError(
            "Hubo un error enviando el correo de reset password. Intenta de nuevo",
            500
        );
    }
};

/**
 * It takes a token, a user type, a password, and a password confirmation, and then it updates the
 * user's password
 * @param token - The token that was sent to the user's email address.
 * @param type - The type that you want to update.
 * @param password - the new password
 * @param passwordConfirm - The password confirmation field.
 */
const resetPassword = async (token, type, password, passwordConfirm) => {
    // 1 get user based on token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // get user based on reset token and expiration date
    const user = await type.findOne({
        changedPasswordToken: hashedToken,
        tokenExpirationDate: { $gte: Date.now() },
    });

    // 2 if token has not expired and there is user set new password
    if (!user) {
        throw new AppError("Token expirado o correo incorrecto", 400);
    }

    // 3 update changedPasswordAt property for the user
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.changedPasswordToken = undefined;
    user.tokenExpirationDate = undefined;
    user.changedPassword = Date.now();
    await user.save();
};

/* The above code is sending an email to the user with a link to reset their password. */
exports.forgotPasswordCaeqUser = catchAsync(async (req, res, next) => {
    await forgotPassword(CaeqUser, req.body.email, req, "caeq");

    res.status(200).json({
        status: "success",
        message: "Correo para recuperar tu contraseña enviado.",
    });
});

/* This is the code that is executed when the user clicks on the link in the email. It is a GET request
to the server. The server then checks if the token is valid and if it is, it allows the user to
change their password. */
exports.resetPasswordCaeqUser = catchAsync(async (req, res, next) => {
    await resetPassword(
        req.params.token,
        CaeqUser,
        req.body.password,
        req.body.passwordConfirm
    );

    res.status(200).json({
        status: "success",
        message: "Contraseña cambiada con exito. Quiza debas iniciar sesion de nuevo",
    });
});

/* The above code is sending an email to the user with a link to reset their password. */
exports.forgotPasswordArchitectUser = catchAsync(async (req, res, next) => {
    await forgotPassword(ArchitectUser, req.body.email, req, "architect");

    res.status(200).json({
        status: "success",
        message: "Correo para recuperar tu contraseña enviado.",
    });
});

/* This is the code that is executed when the user clicks on the link in the email. It is a GET request
to the server. The server then checks if the token is valid and if it is, it allows the user to
change their password. */
exports.resetPasswordArchitectUser = catchAsync(async (req, res, next) => {
    await resetPassword(
        req.params.token,
        ArchitectUser,
        req.body.password,
        req.body.passwordConfirm
    );

    res.status(200).json({
        status: "success",
        message: "Contraseña cambiada con exito. Quiza debas iniciar sesion de nuevo",
    });
});

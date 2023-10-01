const CaeqUser = require('../models/caeq.user.model');
const ArchitectUser = require('../models/architect.user.model');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('../utils/email');
const { promisify } = require('util');

/**
 * This function takes an id as an argument and returns a signed JWT token with the id as the payload
 * and the JWT_SECRET and JWT_EXPIRES_IN as the secret and expiration time respectively.
 * @param id - the user id
 * @returns The signToken function is returning a JWT token.
 */
const signToken = (id, type) => {
    return jwt.sign({ id, type }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

/**
 * It creates a JWT token, sets the cookie options, sets the cookie, and sends the response.
 * @param user - the user object that we just created or updated
 * @param type - the user type that is authenticated
 * @param statusCode - The HTTP status code to send back to the client.
 * @param req - The request object
 * @param res - the response object
 */
const createSendToken = (user, type, statusCode, req, res) => {
    const token = signToken(user._id, type);

    // WEB ONLY - FOR ADMINISTRATORs LOGIN
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000),
        httpOnly: true,
        secure: req.secure,
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

/* Creating a new admin. */
exports.signUpCaeqUser = catchAsync(async (req, res, next) => {
    const newUser = await CaeqUser.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    try {
        await new Email(newUser).sendWelcomeAdmin();
    } catch (error) {
        return next(
            new AppError('Hemos tenido problemas enviando un correo de bienvenida.', 500)
        );
    }

    // After signup a verified admin must approve the new admin
    res.status(200).json({
        status: 'success',
        message:
            'Te has registrado con éxito, espera a que un administrador verifique tu perfil.',
    });
});

/* Creating a new user. */
exports.signUpArchitectUser = catchAsync(async (req, res, next) => {
    const newUser = await ArchitectUser.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    // TO-DO: Add email module
    try {
        await new Email(newUser).sendWelcomeUser();
    } catch (error) {
        return next(
            new AppError('Hemos tenido problemas enviando un correo de bienvenida.', 500)
        );
    }

    return createSendToken(newUser, 'architect', 201, req, res);
});

/* Setting the cookie to loggedout and then sending a response. */
exports.logout = (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
    });
    res.status(200).json({ status: 'success' });
};

/**
 * Checking if the user is logged in. If the user is logged in, the user is allowed
 * to access the protected route. If the user is not logged in, the user is not allowed to access the
 * protected route.
 */
exports.loginArchitectUser = catchAsync(async (req, res, next) => {
    await new Promise((r) => setTimeout(r, 3000));

    const { email, password } = req.body;

    if (!email || !password) {
        // After calling next we want the function to end and send an error.
        return next(
            new AppError('Por favor ingrese un email y contraseña válidos.', 400)
        );
    }

    // 2 Check is user exists.
    const user = await ArchitectUser.findOne({ email }).select('+password'); // adding a + to the field set as selected false means we will retrieve it

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Email o contraseña incorrectos.', 401));
    }

    // 3 Send JWT to user.
    createSendToken(user, 'architect', 201, req, res);
});

/**
 * Checking if the admin is logged in. If the user is logged in, the user is allowed
 * to access the protected route. If the user is not logged in, the user is not allowed to access the
 * protected route.
 */
exports.loginCaeqUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // After calling next we want the function to end and send an error.
        return next(
            new AppError('Por favor ingrese un email y contraseña válidos.', 400)
        );
    }

    // 2 Check is user exists and has been verified.
    const user = await CaeqUser.findOne({ email }).select('+password +verified'); // adding a + to the field set as selected false means we will retrieve it

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Email o contraseña incorrectos.', 401));
    }

    if (!user.verified) {
        return next(
            new AppError(
                'No has sido verificado, espera a que un administrador verifique tu perfil.',
                401
            )
        );
    }
    // 3 Send JWT to user.
    createSendToken(user, 'caeq', 201, req, res);
});

/**
 * The above code is checking if the user is logged in. If the user is logged in, the user is allowed
 * to access the protected route. If the user is not logged in, the user is not allowed to access the
 * protected route.
 */
exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting the token and check if its there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError(
                'No has iniciado sesión, por favor inicia sesión para obtener acceso.',
                401
            )
        );
    }
    // 2) Verification: Validate the token to view if the signature is valid
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // decoded will be the JWT payload - caeq or architect
    const userType = decoded.type;

    // 3) Check if user or admin exists
    let user;
    if (userType === 'caeq') {
        user = await CaeqUser.findById(decoded.id);
    } else if (userType === 'architect') {
        user = await ArchitectUser.findById(decoded.id);
    }

    if (!user) {
        return next(
            new AppError('El usuario con el que intentas ingresar ya no existe.', 401)
        );
    }

    // 4) Check if user changed passwords after the token was issued
    if (user && user.changedPasswordAfter(decoded.iat)) {
        // iat - issued at
        return next(
            new AppError(
                'Has cambiado recientemente tu contraseña. Inicia sesión de nuevo.',
                401
            )
        );
    }

    // 5) Next is called and the req accesses the protected route
    if (user) {
        req.userType = userType;
        req.user = user;
    }
    next();
});

/* Restricting the user to a certain role. Can be caeq or architect. */
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userType)) {
            next(
                new AppError(
                    'No cuentas con los permisos para realizar esta acción.',
                    403
                )
            );
        }
        next();
    };
};

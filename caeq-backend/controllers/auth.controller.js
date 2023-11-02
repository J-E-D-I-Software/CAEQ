const CaeqUser = require('../models/caeq.user.model');
const ArchitectUser = require('../models/architect.user.model');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('../utils/email');
const { promisify } = require('util');

/**
 * Creates a JWT token with the provided user ID and user type.
 *
 * @param {string} id - The user ID.
 * @param {string} type - The user type (e.g., 'caeq' or 'architect').
 * @returns {string} JWT token.
 */
const signToken = (id, type) => {
    return jwt.sign({ id, type }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

/**
 * Creates and sends a JWT token as a cookie in the response.
 *
 * @param {object} user - The user object.
 * @param {string} type - The user type.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
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

/**
 * Creates a new CAEQ user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.signUpCaeqUser = catchAsync(async (req, res, next) => {
    const newUser = await CaeqUser.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    // Uncomment after emails after payed
    // try {
    //     await new Email(newUser).sendWelcomeAdmin();
    // } catch (error) {
    //     return next(
    //         new AppError('Hemos tenido problemas enviando un correo de bienvenida.', 500)
    //     );
    // }

    // After signup a verified admin must approve the new admin
    res.status(200).json({
        status: 'success',
        message:
            'Te has registrado con éxito, espera a que un administrador verifique tu perfil.',
    });
});

/**
 * Creates a new architect user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.signUpArchitectUser = catchAsync(async (req, res, next) => {
    const { collegiateNumber } = req.body;
    let newUser;

    // Check if user already exists
    const existingUser = await ArchitectUser.findOne({ collegiateNumber });

    if (existingUser) {
        if (existingUser.isLegacy === true && existingUser.isOverwritten === false) {
            const password = req.body.password;
            const passwordConfirm = req.body.passwordConfirm;

            if (password !== passwordConfirm) {
                return next(new AppError('Tus contraseñas deben coincidir.'));
            }

            delete req.body.password;
            delete req.body.passwordConfirm;

            // Update existing user
            newUser = await ArchitectUser.findOneAndUpdate(
                { _id: existingUser._id },
                { $set: req.body },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: true,
                }
            );

            // Update password
            newUser = await ArchitectUser.findOneAndUpdate(
                { _id: existingUser._id },
                { $set: { password: password, isOverwritten: true } },
                {
                    new: true,
                    runValidators: false,
                    useFindAndModify: true,
                }
            );
        } else if (
            existingUser.isLegacy === true &&
            existingUser.isOverwritten === true
        ) {
            return next(
                new AppError(
                    'Una persona ya se ha inscrito en el portal con estos datos. Crea una nueva cuenta o si crees que es un error contacta a gerencia.'
                )
            );
        } else if (
            existingUser.isLegacy === false &&
            existingUser.isOverwritten === true
        ) {
            return next(
                new AppError(
                    'El colegiado que intentas sobreescribir se inscribió recientemente y no forma parte del viejo sistema.'
                )
            );
        } else {
            return next(
                new AppError(
                    'Algo salió muy mal.No hemos podido sobreescribir los datos.'
                )
            );
        }
    } else {
        // Create new user
        newUser = await ArchitectUser.create(req.body);
    }

    // Uncomment after emails after payed
    // // Send welcome email
    // try {
    //     await new Email(newUser, process.env.LANDING_URL).sendWelcomeUser();
    // } catch (error) {
    //     return next(
    //         new AppError('Hemos tenido problemas enviando un correo de bienvenida.', 500)
    //     );
    // }

    // Send JWT token
    return createSendToken(newUser, 'architect', 201, req, res);
});

/**
 * Logs out a user by setting the JWT cookie to 'loggedout'.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.logout = (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
    });
    res.status(200).json({ status: 'success' });
};

/**
 * Logs in an architect user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
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
    if (!user) {
        return next(
            new AppError(
                'Email incorrecto. No hay un usuario registrado con este correo.',
                401
            )
        );
    } else if (!(await user.correctPassword(password, user.password))) {
        return next(
            new AppError('Contraseña incorrecta. Intente de nuevo por favor.', 401)
        );
    }

    // 3 Send JWT to user.
    createSendToken(user, 'architect', 201, req, res);
});

/**
 * Logs in a CAEQ user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
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
 * Middleware to check if the user is authenticated.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
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

/**
 * Middleware to restrict access based on user roles.
 *
 * @param {...string} roles - User roles (e.g., 'caeq', 'architect').
 * @returns {function} Middleware function.
 */
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

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const Email = require('./utils/email');

// Read env variables and save them
dotenv.config({ path: './.env' });

// App error
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// Routers
const fileTestRouter = require('./routes/files.route');
const caeqRouter = require('./routes/caeq.user.route');
const architectRouter = require('./routes/architect.user.route');
const courseRouter = require('./routes/course.route');
const emailRouter = require('./routes/email.route');
const specialtyRouter = require('./routes/specialty.route');
const aggregationsRouter = require('./routes/aggregations.route');
const sessionRouter = require('./routes/session.route');
const gatheringRouter = require('./routes/gathering.route');
const attendeesRouter = require('./routes/attendees.route');

const app = express();

app.enable('trust proxy');
app.use(cors());
app.options('*', cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SECURITY HEADERS
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
            baseUri: ["'self'"],
            fontSrc: ["'self'", 'https:', 'http:', 'data:'],
            scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
            imgSrc: ["'self'", 'data:', 'blob:'],
        },
    })
);

// Defend against nossql injection
app.use(mongoSanitize());

// Improve request performance
app.use(compression());

// LIMMIT REQUESTS
const limiter = rateLimit({
    max: 10000,
    // 1 hour
    windowMs: 60 * 60 * 1000,
    handler: function (req, res, next) {
        return next(
            new AppError(
                'Has enviado demasiadas peticiones, espera un tiempo antes de continuar.',
                429
            )
        );
    },
});

app.use(limiter);

// Routes
app.use('/filetest', fileTestRouter);
app.use('/caequsers', caeqRouter);
app.use('/architectusers', architectRouter);
app.use('/courses', courseRouter);
app.use('/email', emailRouter);
app.use('/specialties', specialtyRouter);
app.use('/aggregations', aggregationsRouter);
app.use('/sessions', sessionRouter);
app.use('/gatherings', gatheringRouter);
app.use('/attendees', attendeesRouter);

// ERROR HANDLER FOR UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    const error = new AppError(`Can´t find ${req.originalUrl} on this server`, 404);

    next(error);
});

app.use(globalErrorHandler);

module.exports = app;

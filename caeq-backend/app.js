const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Read env variables and save them
dotenv.config({ path: './.env' });

// App error
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// Routers
const fileTestRouter = require('./routes/files.route');
const caeqRouter = require('./routes/caeq.user.route');
const architectRouter = require('./routes/architect.user.route');

const app = express();

app.enable('trust proxy');
app.use(cors());
app.options('*', cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/filetest', fileTestRouter);
app.use('/caequsers', caeqRouter);
app.use('/architectusers', architectRouter);

// ERROR HANDLER FOR UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    const error = new AppError(`Can´t find ${req.originalUrl} on this server`, 404);

    next(error);
});

app.use(globalErrorHandler);

module.exports = app;

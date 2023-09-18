var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// App error
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// Routers
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user.route');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api/v1/users', userRouter);

// Error handler for unhandled routes
app.all('*', (req, res, next) => {
    const error = new AppError(
        `Can't find ${req.originalUrl} on this server`,
        404
    );

    next(error);
});

app.use(globalErrorHandler);

module.exports = app;

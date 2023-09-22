const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { htmlToText } = require('html-to-text');

const Email = require('./utils/email');

const user = {
    email: "caeq.recepcion@gmail.com",
    name: 'Lucero Rodríquez',
  };

const url = 'https://tec.mx';

const emailInstance = new Email(user, url);

// Llama a los métodos de la clase Email
emailInstance.sendWelcome();
//emailInstance.sendPasswordReset();



// Routers
const userRouter = require('./routes/caeq.user.route');

const app = express();


app.use(cors());
app.options('*', cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/caequsers', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(201).json({
        status: 'success',
        data: {
            documents: ['hola', 'soy', 'el', 'back'],
        },
    });
});


module.exports = app;

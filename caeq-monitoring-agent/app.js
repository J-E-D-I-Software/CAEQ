const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const axios = require('axios');

const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Read env variables and save them
dotenv.config({ path: './.env' });

// App error
const AppError = require('./utils/appError');

const app = express();

app.enable('trust proxy');
app.use(cors());
app.options('*', cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

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

// ERROR HANDLER FOR UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    const error = new AppError(`Can´t find ${req.originalUrl} on this server`, 404);

    next(error);
});

const responseTimesProd = [];
const responseTimesTest = [];
const maxResponseTimesToKeep = 30;

async function makeRequestAndLogResponseTimeProduction() {
    const targetUrl = process.env.BASE_API_ENDPOINT_PROD + '/courses?limit=5&page=1';
    try {
        const startTime = Date.now();
        const response = await axios.get(targetUrl);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        responseTimesProd.push(responseTime);

        if (responseTimesProd.length > maxResponseTimesToKeep) {
            responseTimesProd.shift(); // Remove the oldest response time if the array is too long
        }

        const averageResponseTime =
            responseTimesProd.reduce((acc, time) => acc + time, 0) /
            responseTimesProd.length;

        console.log(
            `Response from ${targetUrl}: Status ${
                response.status
            }, Response Time: ${responseTime}ms, Average Response Time: ${averageResponseTime.toFixed(
                2
            )}ms`
        );
    } catch (error) {
        console.error(`Error while making the request to ${targetUrl}: ${error.message}`);
    }
}

async function makeRequestAndLogResponseTimeTesting() {
    const targetUrl = process.env.BASE_API_ENDPOINT_TEST + '/courses?limit=5&page=1';
    try {
        const startTime = Date.now();
        const response = await axios.get(targetUrl);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        responseTimesTest.push(responseTime);

        if (responseTimesTest.length > maxResponseTimesToKeep) {
            responseTimesTest.shift(); // Remove the oldest response time if the array is too long
        }

        const averageResponseTime =
            responseTimesTest.reduce((acc, time) => acc + time, 0) /
            responseTimesTest.length;

        console.log(
            `Response from ${targetUrl}: Status ${
                response.status
            }, Response Time: ${responseTime}ms, Average Response Time: ${averageResponseTime.toFixed(
                2
            )}ms`
        );
    } catch (error) {
        console.error(`Error while making the request to ${targetUrl}: ${error.message}`);
    }
}

// Interval in milliseconds (e.g., every 5 seconds)
const monitoringInterval = 60000;

// Start monitoring at regular intervals
setInterval(makeRequestAndLogResponseTimeProduction, monitoringInterval);
setInterval(makeRequestAndLogResponseTimeTesting, monitoringInterval);

module.exports = app;

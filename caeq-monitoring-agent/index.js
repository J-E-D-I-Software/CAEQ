const dotenv = require('dotenv');
const functions = require('firebase-functions');

// Read env variables and save them
dotenv.config({ path: './.env' });

// Error catching
process.on('unhandledException', (err) => {
    console.log('UNHANDLED EXCEPTION!: SHUTTING DOWN');
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);
});

const app = require(`${__dirname}/app.js`);

const port = process.env.SERVER_PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server running on ${port}...`);
});

// UNHANDLED REJECTION
/* Catching unhandled rejections. */
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION!: SHUTTING DOWN');
    server.close(() => {
        process.exit(1);
    });
});

// SERVER SHUTDOWN
/* A signal that is sent to the process to tell it to terminate. */
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down.');
    server.close(() => {
        console.log('Process terminated.');
    });
});

exports.monitor = functions.https.onRequest(app);

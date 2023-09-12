const dotenv = require('dotenv');

const app = require(`${__dirname}/app.js`);

const port = 5000;

// app.listen nos regresa un objeto de
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

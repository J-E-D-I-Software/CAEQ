const dotenv = require('dotenv');
const functions = require('firebase-functions');
const mongoose = require('mongoose');
const { setUpDbWithMuckData } = require('./models/testdata.setup');
const { connectDB, dropCollections, dropDB } = require('./tests/config/databaseTest');
const importArchitectData = require('./utils/importArchitectUsers');

// Read env variables and save them
dotenv.config({ path: './.env' });

// Error catching
process.on('unhandledException', (err) => {
    console.log('UNHANDLED EXCEPTION!: SHUTTING DOWN');
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);
});

// Connection to muckdb
const achitectsDataFilePath = process.env.ARCHITECTS_DATA_FILEPATH || './models/data/RELACION CAEQ 2022-2023.csv';
const saveImportErrors = process.argv.includes('--saveImportErrors');
const importGatherings = process.argv.includes('--importGatherings');
if (process.env.NODE_ENV === 'development') {
    connectDB()
        .then(() => setUpDbWithMuckData())
        .then(() => importArchitectData(achitectsDataFilePath, importGatherings, saveImportErrors))
        .then('Muck data loaded into db');

    // Connect using mongoose
} else {
    let DB = process.env.DATABASE_CONNECTION.replace(
        '<password>', 
        process.env.DATABASE_PASSWORD
        ).replace('<user>', process.env.DATABASE_USER);

    if (process.env.NODE_ENV === 'production') {
        DB = DB.replace('<database>', process.env.DATABASE_NAME_PROD);
    } else {
        DB = DB.replace('<database>', process.env.DATABASE_NAME_TEST);
    }

    // Connection to real database
    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async (con) => {
            console.log(`Connection to ${process.env.NODE_ENV} DB successful`);

            if (process.env.NODE_ENV === 'testing') {
                try {
                    await setUpDbWithMuckData();
                } catch (error) {
                    console.log(error);
                }
            }
        })
        .catch((err) => console.log('Connection to DB rejected', err));
}

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
    if (process.env.NODE_ENV === 'development') {
        dropCollections
            .then(() => dropDB)
            .catch((e) => console.log('Error shutting down.'))
            .finally(server.close());
    } else {
        server.close(() => {
            console.log('Process terminated.');
        });
    }
});

if (process.env.NODE_ENV === 'production') {
    exports.prod = functions.https.onRequest(app);
} else {
    exports.test = functions.https.onRequest(app);
}

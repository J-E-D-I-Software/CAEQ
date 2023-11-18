const dotenv = require('dotenv');
const mongoose = require('mongoose');
const importArchitectCapacitationHours = require('../utils/importArchitectCapacitationHours');

dotenv.config({ path: './.env' });
const filePathHours = process.env.ARCHITECTS_HOURS || './models/data/HORAS 2023.csv';

if (process.env.NODE_ENV !== 'development') {
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
        .then(() => importArchitectCapacitationHours(filePathHours))
        .catch((err) => console.log('Connection to DB rejected', err));
} else {
    console.log('Running in development mode, cannot execute import data');
}

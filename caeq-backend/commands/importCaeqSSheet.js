const dotenv = require('dotenv');
const mongoose = require('mongoose');
const importArchitectData = require('../utils/importArchitectUsers');

dotenv.config({ path: './.env' });
const saveImportErrors = process.argv.includes('--saveImportErrors') || false;
const importGatherings = process.argv.includes('--importGatherings') || false;
const filePath = process.env.ARCHITECTS_DATA_FILEPATH || './models/data/RELACION CAEQ 2022-2023.csv';

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
        .then(() => importArchitectData(filePath, importGatherings, saveImportErrors))
        .catch((err) => console.log('Connection to DB rejected', err));
} else {
    console.log('Running in development mode, cannot execute import data');
}

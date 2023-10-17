const mongoose = require('mongoose');
const { connectDB } = require('../tests/config/databaseTest');
const dotenv = require('dotenv');
const fs = require('fs');
const csv = require('csv-parser');
const ArchitectUser = require('../models/architect.user.model');

/**
 * Imports architect data from a CSV file and saves it to a MongoDB collection.
 *
 * @returns {void}
 */
function importArchitectData() {
    // Define mapping 
    const mappingScheme = {
        collegiateNumber: 1,
        fullName: 48,
        DRONumber: 0,
        authorizationToShareInfo: 2,
        lifeInsurance: 46,
        age: 3,
        gender: 49,
        cellphone: 50,
        officePhone: 51,
        emergencyContact: 56,
        mainProfessionalActivity: 57,
        dateOfAdmission: 59,
        dateOfBirth: 64,
        municipalityOfLabor: 76,
        university: 65,
        professionalLicense: 67,
        workAddress: 55,
        homeAddress: 54,
        specialty: 58,
        email: 53,
    }
    const blankFields = [
        'memberType',
        'classification',
        'positionsInCouncil',
    ];
    const processedFields = {
        collegiateNumber: x => parseInt(x) ? parseInt(x) : null,
        authorizationToShareInfo: x => x.toLowerCase().includes('si'),
        lifeInsurance: x => x.toLowerCase().includes('x'),
        age: x => parseInt(x) ? parseInt(x) : null,
        cellphone: x => parseInt(x.replace(/\D/g, '')) ? parseInt(x.replace(/\D/g, '')) : null,
        officePhone: x => parseInt(x.replace(/\D/g, '')) ? parseInt(x.replace(/\D/g, '')) : null,
        dateOfAdmission: x => parseInt(x) ? parseInt(x) : null,
        gender: x => x.toLowerCase().includes('h') ? 'Hombre' : 
                    x.toLowerCase().includes('m') ? 'Mujer' : 'Prefiero no decirlo',
        dateOfBirth: x => {
            if (x === '') return null;
            const dateParts = x.split('/');
            const date = new Date(`${dateParts[0]}-${dateParts[1]}-20${dateParts[2]}`);
            return isNaN(date) ? null : date;
        },
    };
    const requiredFields = Object.keys(ArchitectUser.schema.paths).filter(
        key => ArchitectUser.schema.paths[key].isRequired
    );
    console.log(requiredFields);

    // Parse CSV file
    const results = [];
    const errors = [];
    const csvFilePath = './models/data/architects.csv';
    let rowNumber = 0; // Initialize row number variable
    fs.createReadStream(csvFilePath)
        .pipe(csv({ headers: false })) // Set headers option to false
        .on('data', row => {
            rowNumber++;

            const mappedData = {};
            let error = '';
            
            // Map CSV data to model schema
            Object.entries(mappingScheme).forEach(([fieldName, index]) => {
                mappedData[fieldName] = row[index] || '';
            });
            
            // Set fields which are not in the CSV table to '-'
            blankFields.forEach(fieldName => {
                mappedData[fieldName] = '-';
            });

            // Process fields and final validations
            Object.entries(processedFields).forEach(([fieldName, process]) => {
                try {
                    let processedValue = process(mappedData[fieldName]);
                    mappedData[fieldName] = processedValue;

                    if (requiredFields.includes(fieldName) && (processedValue === null || processedValue === ''))
                        error += `${fieldName} es un campo requerido.`;

                } catch (err) {
                    error += `El campo ${fieldName} tiene un valor inválido: ${mappedData[fieldName]}`;
                }
            });

            // Check if there are errors, if so, push to errors array and return
            if (error !== '') {
                errors.push(`Error en la fila ${rowNumber}, num Colegiado ${row[1]}: ${error}`);
                return;
            }

            // Final touches
            mappedData.password = 'PASSWORDMAMALON';
            mappedData.passwordConfirm = 'PASSWORDMAMALON';
            results.push(mappedData);
        })
        .on('end', () => {
            console.log(errors.length);
            // Save the mapped data to the MongoDB collection
            ArchitectUser.insertMany(results, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Data imported successfully');
                }
            });
        });
}

// Read env variables and save them
dotenv.config({ path: './.env' });

// Define the MongoDB connection
if (process.env.NODE_ENV === 'development') {
    connectDB()
        .then(() => importArchitectData());
} 
else {
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
        .then(() => importArchitectData())
        .catch((err) => console.log('Connection to DB rejected', err));
}
  
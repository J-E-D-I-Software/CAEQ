const fs = require('fs');
const csv = require('csv-parser');
const ArchitectUser = require('../models/architect.user.model');
const validator = require('validator');
const importArchitectGatheringsData = require('./importArchitectGatherings');

/**
 * Imports architect data from a CSV file and saves it to a MongoDB collection.
 * @param {string} csvFilePath - The path to the CSV file.
 * @param {boolean} [importGatherings=true] - Whether to import the gatherings data or not.
 * @param {boolean} [saveErrors=false] - Whether to save the errors to a CSV file or not.
 *
 * @returns {void}
 */
async function importArchitectData(
    csvFilePath,
    importGatherings = true,
    saveErrors = false
) {
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
    };
    const processedFields = {
        collegiateNumber: (x) => (parseInt(x) ? parseInt(x) : null),
        authorizationToShareInfo: (x) => (x ? x.toLowerCase().includes('si') : 'no'),
        lifeInsurance: (x) => x.toLowerCase().includes('x'),
        age: (x) => (parseInt(x) ? parseInt(x) : null),
        cellphone: (x) =>
            parseInt(x.replace(/\D/g, '')) ? parseInt(x.replace(/\D/g, '')) : null,
        officePhone: (x) =>
            parseInt(x.replace(/\D/g, '')) ? parseInt(x.replace(/\D/g, '')) : null,
        dateOfAdmission: (x) => {
            const yearRegex = /\b\d{2,4}\b/g;
            const match = x.match(yearRegex);
            if (match && match.length > 0) {
                const year = parseInt(match[0].trim());
                return isNaN(year) ? null : year;
            } else return null;
        },
        gender: (x) =>
            x.toLowerCase().includes('h')
                ? 'Hombre'
                : x.toLowerCase().includes('m')
                ? 'Mujer'
                : 'Prefiero no decirlo',
        dateOfBirth: (x) => {
            if (x === '') return null;
            const dateParts = x.split('/');
            const date = new Date(`19${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
            return isNaN(date) ? null : date;
        },
        email: (x) => {
            const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
            const match = x.match(emailRegex);
            if (match && match.length > 0 && validator.isEmail(match[0])) return match[0];
            else return `${Math.random()}@correoinvalido.com`;
        },
    };
    const requiredFields = Object.keys(ArchitectUser.schema.paths).filter(
        (key) => ArchitectUser.schema.paths[key].isRequired
    );
    const uniqueFields = Object.keys(ArchitectUser.schema.paths).filter(
        (key) => ArchitectUser.schema.paths[key].options.unique
    );
    const query = ArchitectUser.find().sort({ collegiateNumber: 1 });
    const currentUsers = await query.exec();
    const uniqueFieldsMap = {};
    uniqueFields.forEach((key) => {
        uniqueFieldsMap[key] = currentUsers.map((x) => x[key]);
    });

    // Parse CSV file
    const results = [];
    const errors = [];
    let rowNumber = 0;
    fs.createReadStream(csvFilePath)
        .pipe(csv({ headers: false }))
        .on('data', (row) => {
            rowNumber++;
            const mappedData = {};
            let error = '';

            if (rowNumber === 1) return; // Skip the first row
            if (row[1] === '') return; // Skip empty rows

            // Set all initial string values to '-'
            Object.keys(ArchitectUser.schema.paths).forEach((key) => {
                if (ArchitectUser.schema.paths[key].instance === 'String')
                    mappedData[key] = '-';
            });

            // Map CSV data to model schema
            Object.entries(mappingScheme).forEach(([fieldName, index]) => {
                // 1. get the element from the csv
                let value = row[index];
                // 2. process it if necessary
                if (processedFields[fieldName])
                    try {
                        value = processedFields[fieldName](row[index]);
                    } catch (error) {
                        error += `El campo ${fieldName} tiene un valor 
                                    inválido: "${value}", error: ${error}\n`;
                    }
                if (!value && value !== false) value = mappedData[fieldName] || null;

                // 4. check if it's a required field and if it's empty
                if (
                    requiredFields.includes(fieldName) &&
                    !value &&
                    value !== false &&
                    mappedData[fieldName] !== '-'
                )
                    error += `${fieldName} es un campo requerido.\n`;
                else mappedData[fieldName] = value;
            });
            // Check for unique fields
            uniqueFields.forEach((fieldName) => {
                if (uniqueFieldsMap[fieldName].includes(mappedData[fieldName])) {
                    error += `El campo ${fieldName} con valor ${mappedData[fieldName]} ya existe en la base de datos.\n`;
                }
            });

            // Check if there are errors, if so, push to errors array and continue to nex row
            if (error !== '') {
                errors.push(`Error en la fila ${rowNumber - 1}: ${error}`);
                return;
            }

            // Update the unique fields map
            Object.keys(uniqueFieldsMap).forEach((key) => {
                uniqueFieldsMap[key].push(mappedData[key]);
            });

            // Generate a random password
            const length = 10;
            const charset =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            mappedData.password = password;
            mappedData.passwordConfirm = password;

            results.push(mappedData);
        })
        .on('end', () => {
            // Save the mapped data to the MongoDB collection
            ArchitectUser.insertMany(results).then((res) => {
                console.log(
                    `${res.length} architect entries added successfully, ${errors.length} rows errored.`
                );

                if (saveErrors) {
                    const errorCsv = errors.join('\n');
                    fs.writeFile('./models/data/importErrors.csv', errorCsv, (err) => {
                        if (err) throw err;
                        console.log('Errors saved to ./models/data/importErrors.csv');
                    });
                }

                if (importGatherings) importArchitectGatheringsData(csvFilePath);
            });
        });
}

module.exports = importArchitectData;

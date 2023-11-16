const fs = require('fs');
const csv = require('csv-parser');
const ArchitectUser = require('../models/architect.user.model');
const GatheringSchema = require('../models/gathering.model');
const AttendeeSchema = require('../models/attendees.model');
/**
 * Imports architect capacitation hours data from a CSV file and saves it to a MongoDB collection.
 *
 * @returns {void}
 */
async function importArchitectCapacitationHours(csvFilePath) {
    let updatedUsers = 0;
    console.log('Loading hours');
    // Parse CSV file
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', async (row) => {
            const properties = Object.keys(row);
            const collegiateNumber = row[properties[0]];

            if (!collegiateNumber) return;

            await ArchitectUser.findOneAndUpdate(
                { collegiateNumber },
                { capacitationHours: parseInt(row['HRS 2023']) }
            );

            updatedUsers++;
        })
        .on('end', async () => {
            console.log(`User hours updated! ${updatedUsers}`);
        });
}

module.exports = importArchitectCapacitationHours;

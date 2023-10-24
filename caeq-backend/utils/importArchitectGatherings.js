const fs = require('fs');
const csv = require('csv-parser');
const ArchitectUser = require('../models/architect.user.model');
const GatheringSchema = require('../models/gathering.model');
const validator = require('validator');

/**
 * Imports architect gatherings data from a CSV file and saves it to a MongoDB collection.
 *  
 * @returns {void}
 */
async function importArchitectGatheringsData(csvFilePath) {
    // Parse CSV file
    fs.createReadStream(csvFilePath) 
        .pipe(csv())
        .on('data', async row => {

            // Find the architect user
            const collegiateNumber = parseInt(row['NUM. COLEGIADO ']);
            if (!collegiateNumber) return; 
            
            const architectUser = await ArchitectUser.findOne({ collegiateNumber });
            if (!architectUser) return;

            const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                            'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
            Object.entries(row).slice(77, 286).forEach(async ([key, value]) => {
                key = key.toLowerCase();
                if (key.includes('tota')) return;
                if (key.includes('elecc')) return;
                if (parseInt(value) !== 1) return;

                // Find the date and if it's extraordinary
                const regex = /((\d{1,2})-?(\w{3,})-?(\d{2})|(\d{1,2})-?(\w{3,})-?(\d{4})|(\w{3,})-?(\d{2}))/i;
                const match = key.match(regex);
                if (!match) return

                const dateStr = match[0];
                const dateParts = dateStr.split('-');
                let day = null;
                let monthStr = null;
                let yearStr = null;
                let month = null;
                let date = null;
                if (dateParts.length === 2) {
                    monthStr = dateParts[0];
                    yearStr = dateParts[1].length === 2 ? `20${dateParts[1]}` : dateParts[1];
                    month = months.indexOf(monthStr.slice(0,3)) + 1;
                }
                else if (dateParts.length === 3) {
                    day = dateParts[0] ? parseInt(dateParts[0]) : null;
                    monthStr = dateParts[1];
                    yearStr = dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
                    month = months.indexOf(monthStr.slice(0,3)) + 1;
                    date = new Date(`${yearStr}-${monthStr}-${dateParts[0]}`);
                }
                
                const extraordinary = key.includes('extr');
                const isExtraordinary = Boolean(extraordinary);
                
                const filter = { day, month, year: yearStr, isExtraordinary };
                const update = { $setOnInsert: filter };
                const options = { upsert: true, new: true };

                // Get the Gathering and update it, create one if it doesn't exist
                const gathering = await GatheringSchema.findOneAndUpdate(filter, update, options);
                if (!gathering) {
                    const newGathering = new GatheringSchema(filter);
                    newGathering.attendees.push(architectUser._id);
                    await newGathering.save();
                } else {
                    if (!gathering.attendees.includes(architectUser._id)) {
                        gathering.attendees.push(architectUser._id);
                        await gathering.save();
                    }
                }
            });
        })
        .on('end', async () => {
            const gatherings = await GatheringSchema.find();
            console.log(`${gatherings.length} gatherings imported!`);
        });
}

module.exports = importArchitectGatheringsData;
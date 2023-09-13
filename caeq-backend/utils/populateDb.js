const mongoose = require('mongoose');
const catchAsync = require('./catchAsync');

/**
 * Function to populate a Mongoose model with data from an array of objects
 * @param {mongoose.Model} model - The Mongoose model to populate.
 * @param {Array} dataArray - An array of objects containing data to populate the model with.
 * @returns {Promise<Array>} - A promise that resolves to an array of the created model instances.
 */
const populateModelWithData = catchAsync(async (model, dataArray) => {
    // Use the Mongoose 'create' method to insert data into the model
    const createdInstances = await model.create(dataArray);
    return createdInstances;
});

module.exports = populateModelWithData;

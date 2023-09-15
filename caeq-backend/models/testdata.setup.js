const populateDb = require('../utils/populateDb');
const catchAsync = require('../utils/catchAsync');
const CaeqUser = require('./caeq.user.model');
const CaeqUserData = require('./data/caeq.user'); // Use path.join for a consistent file path

/**
 * Set up 'CaeqUser' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpCaeqUserData = catchAsync(async () => {
    await populateDb(CaeqUser, CaeqUserData);
});

/**
 * Set up the database with mock data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 * It sets up the 'CaeqUser' data by calling 'setUpCaeqUserData' and logs a message when the test data is uploaded to the database.
 */
exports.setUpDbWithMuckData = catchAsync(async () => {
    await setUpCaeqUserData();
    console.log('Test data uploaded to DB.');
});
const populateDb = require('../utils/populateDb');
const catchAsync = require('../utils/catchAsync');
const CaeqUsuario = require('./caeq.usuario.model');
const CaeqUsuarioData = require('./data/caeq.usuario'); // Use path.join for a consistent file path

/**
 * Set up 'CaeqUsuario' data by populating the database with the provided test data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 */
const setUpCaeqUsuarioData = catchAsync(async () => {
    await populateDb(CaeqUsuario, CaeqUsuarioData);
});

/**
 * Set up the database with mock data.
 *
 * This function is wrapped in 'catchAsync' to handle any asynchronous errors that may occur during execution.
 * It sets up the 'CaeqUsuario' data by calling 'setUpCaeqUsuarioData' and logs a message when the test data is uploaded to the database.
 */
exports.setUpDbWithMuckData = catchAsync(async () => {
    await setUpCaeqUsuarioData();
    console.log('Test data uploaded to DB.');
});

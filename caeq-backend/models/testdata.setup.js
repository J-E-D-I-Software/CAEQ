const populateDb = require('../utils/populateDb');
const catchAsync = require('../utils/catchAsync');
const CaeqUsuario = require('./caeq.usuario.model');
const CaeqUsuarioData = require('./data/caeq.usuario'); // Use path.join for a consistent file path

const setUpCaeqUsuarioData = catchAsync(async () => {
    await populateDb(CaeqUsuario, CaeqUsuarioData);
});

exports.setUpDbWithMuckData = catchAsync(async () => {
    await setUpCaeqUsuarioData();
    console.log('Test data uploaded to DB.');
});

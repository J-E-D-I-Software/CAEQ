const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nombre de bitácora requerido'],

    },
    costXmeter: {
        type: Number,
        required: [true, 'Costo del salón requerido'],

    },
    meters: {
        type: Number,
        required: [true, 'Capacidad del salón requerida'],

    },
    totalCost: {
        type: Number,
        required: [false]

    },
});

const Log = mongoose.model('Log',logSchema);
module.exports = Log;
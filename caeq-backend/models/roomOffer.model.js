const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nombre de salón requerido'],

    },
    cost: {
        type: Number,
        required: [true, 'Costo del salón requerido'],

    },
    capacity: {
        type: Number,
        required: [true, 'Capacidad del salón requerida'],

    },
    specifications: {
        type: String,
        required: [false]

    },
    file: {
        type: String,
        required: [false]

    },
});

const RoomOffer = mongoose.model('RoomOffer',roomSchema);

module.exports = RoomOffer;
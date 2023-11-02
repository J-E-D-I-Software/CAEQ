const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Se necesita al menos una especialidad'],
        unique: [true, 'Esta especialidad ya existe. Elige otro.'],
    },
});

const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = Specialty;
module.exports.specialtySchema = Specialty;

const mongoose = require('mongoose');

const BenefitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del beneficio.'],
    },
    location: {
        type: String,
    },
    contact: {
        type: String,
    },
    website: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'Por favor ingresa la descripción del beneficio.'],
    },
    category: {
        type: String,
        required: [true, 'Por favor ingresa a qué categoría pertenece el beneficio.'],
    },
});

const Benefit = mongoose.model('benefit', BenefitSchema);

module.exports = Benefit;

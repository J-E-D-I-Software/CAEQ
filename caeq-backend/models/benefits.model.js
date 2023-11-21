const mongoose = require('mongoose');

const BenefitSchema = new mongoose.Schema({
    name: {
        type: String,
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
    },
    category: {
        type: String,
    },
});

const Benefit = mongoose.model('benefit', BenefitSchema);

module.exports = Benefit;

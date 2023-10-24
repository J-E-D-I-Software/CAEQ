const mongoose = require('mongoose');

const GatheringSchema = new mongoose.Schema({
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArchitectUser'
    }],
    isExtraordinary: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
    },
    day : {
        type: Number,
        min: 1,
        max: 31
    },
    month: {
        type: Number,
        min: 1,
        max: 12,
        required: [true, 'Por favor dinos el mes de la reunión!']
    },
    year: {
        type: String,
        required: [true, 'Por favor dinos el año de la reunión!']
    },
});

const Gathering = mongoose.model('Gathering', GatheringSchema);

module.exports = Gathering;

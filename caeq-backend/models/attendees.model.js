const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
    idGathering: {
        type: mongoose.Schema.ObjectId,
        ref: 'Gathering',
    },
    idArchitect: {
        type: mongoose.Schema.ObjectId,
        ref: 'architect.user',
    },
    modality: {
        type: String,
        enum: ['Presencial', 'Remoto'],
        default: 'Presencial',
    },
    attended: {
        type: Boolean,
        default: false,
    },
});

AttendeeSchema.index({ idGathering: 1 });
AttendeeSchema.index({ idArchitect: 1 });

const Attendee = mongoose.model('attendee', AttendeeSchema);

module.exports = Attendee;

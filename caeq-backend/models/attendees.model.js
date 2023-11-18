const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
    idGathering: {
        type: mongoose.Schema.ObjectId,
        ref: 'Gathering',
        required: [true, 'Una asistencia debe incluir una asamblea.'],
    },
    idArchitect: {
        type: mongoose.Schema.ObjectId,
        ref: 'architect.user',
        required: [true, 'Una asistencia debe incluir un usuario.'],
        validate: {
            validator: async function (value) {
                // Check if a document with the same combination of idGathering and idArchitect already exists
                const existingAttendee = await this.constructor.findOne({
                    idGathering: this.idGathering,
                    idArchitect: value,
                });
                return !existingAttendee;
            },
            message: 'Ya registraste una asistencia del arquitecto a esta asamblea.',
        },
    },
    modality: {
        type: String,
        enum: ['Presencial', 'Remoto'],
        default: 'Presencial',
    },
    attended: {
        type: Boolean,
        default: true,
    },
});

AttendeeSchema.index({ idGathering: 1 });
AttendeeSchema.index({ idArchitect: 1 });

const Attendee = mongoose.model('attendee', AttendeeSchema);

module.exports = Attendee;

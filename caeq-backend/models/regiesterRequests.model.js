const mongoose = require('mongoose');

const registerRequest = new mongoose.Schema(
    {
        overwrites: {
            type: mongoose.Schema.ObjectId,
            ref: 'architect.user',
            required: [
                true,
                'Se necesita nueva información para sobreescribir a un colegiado.',
            ],
        },
        newInfo: {
            type: mongoose.Schema.ObjectId,
            ref: 'Course',
            required: [
                true,
                'Se necesita nueva información para sobreescribir a un colegiado.',
            ],
        },
        architectNumber: {
            type: Number,
            required: [
                true,
                'Una petición de registro necesita de un número de colegiado.',
            ],
        },
    },
    { timestamps: true }
);

const RegisterRequest = mongoose.model('RegisterRequest', registerRequest);

module.exports = RegisterRequest;

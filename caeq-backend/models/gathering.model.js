const mongoose = require('mongoose');

const GatheringSchema = new mongoose.Schema({
    isExtraordinary: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        maxLength: [60, 'El nombre de la asamblea no puede exceder 40 letras.'],
    },
    meetingLink: {
        type: String,
    },
    meetingTime: {
        type: String,
        maxLength: [20, 'El tiempo de la asamblea no puede exceder 20 letras.'],
    },
    moreInfo: {
        type: String,
    },
    date: {
        type: Date,
    },
    day: {
        type: Number,
        min: 1,
        max: 31,
        default: 1,
    },
    month: {
        type: Number,
        min: 1,
        max: 12,
    },
    year: {
        type: String,
    },
});

// MIDDLEWARES
/** This is a middleware that runs before the save() or create() method. It hashes the password and sets
the passwordConfirm to undefined. */
GatheringSchema.pre('save', async function (next) {
    if (!this.day && !this.date) {
        this.date = new Date(`${this.month}/1/${this.year}`);
    } else if (!this.date) {
        this.date = new Date(`${this.month}/${this.day}/${this.year}`);
    }

    if (!this.title && this.date) {
        this.title = `Asamblea del ${this.date.toLocaleDateString('es-MX')}`;
    }

    if (!this.year && this.date) {
        this.year = this.date.getFullYear();
    }
    if (!this.month && this.date) {
        this.year = this.date.getMonth();
    }

    return next();
});

const Gathering = mongoose.model('gathering', GatheringSchema);

module.exports = Gathering;

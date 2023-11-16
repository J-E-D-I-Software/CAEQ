const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArchitectUser'
    }],
    date: {
        type: Date,
    },
    time: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course'
    }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const specialtySchema = new mongoose.Schema({
    specialty: {
        type: String,
        required: [true] 
    
    }
})

const Specialties = mongoose.model('Specialties', specialtySchema);

module.exports = Specialties;
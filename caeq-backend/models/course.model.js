const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const { Double } = require('mongodb');

const CourseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, 'Nombre de curso requerido'],
        },
        modality: {
            type: String,
        },
        numberHours: {
            type: Number,
        },
        startDate: {
            type: Date,
        },
        objective: {
            type: String
        },
        schedule: {
            type: Double
        },
        daysOfSession: {
            type: String
        },
        temario: {
            type: String
        },
        price: {
            type: Double
        },
        teacherName: {
            type: String,
        },
        teacherRaing: {
            type: String,
        },
        paymentInfo : {
            type: String,
        }
    },
    { timestamps: true }
);

// Indexing course properties for optimized search
CourseSchema.index({ status: 1 });
CourseSchema.index({ modality: 1 });
CourseSchema.index({ courseName: 1 });
CourseSchema.index({ postalCode: 1 });

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, 'Nombre de curso requerido'],
        },
        modality: {
            type: String,
            enum: { values: ['Presencial', 'Remoto'] },
            required: [true, 'Modalidad requerida'],
            default: 'Presencial',
        },
        pricing: {
            type: String,
            enum: { values: ['Gratuito', 'Pagado'] },
            default: 'Gratuito',
        },
        capacity: {
            type: Number,
            required: [true, 'Capacidad de curso requerido'],
        },
        numberHours: {
            type: Number,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        description: {
            type: String
        },
        objective: {
            type: String
        },
        schedule: {
            type: String
        },
        daysOfSession: {
            type: String
        },
        temario: {
            type: String
        },
        includes: {
            type: String
        },
        place: {
            type: String
        },
        price: {
            type: Number,
        },
        teacherName: {
            type: String,
        },
        teacherReview: {
            type: String,
        },
        paymentInfo: {
            type: String,
        },
        imageUrl: {
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
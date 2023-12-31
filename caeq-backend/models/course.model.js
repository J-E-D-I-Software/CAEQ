const mongoose = require('mongoose');
const AppError = require('../utils/appError');

const CourseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, 'Nombre de curso requerido'],
            maxLength: [70, 'El nombre del curso no puede exceder 70 letras.'],
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
            validate: {
                validator: Number.isInteger,
                message: 'La capacidad del curso debe ser un número entero',
            },
        },
        numberHours: {
            type: Number,
            validate: {
                validator: Number.isInteger,
                message: 'El número de horas del curso debe ser un número entero',
            },
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        description: {
            type: String,
        },
        objective: {
            type: String,
        },
        schedule: {
            type: String,
            maxLength: [25, 'El horario del curso no puede exceder 25 letras.'],
        },
        daysOfSession: {
            type: String,
            maxLength: [25, 'Los días del curso no puede exceder 25 letras.'],
        },
        temario: {
            type: String,
        },
        includes: {
            type: String,
        },
        place: {
            type: String,
            maxLength: [25, 'El lugar del curso no puede exceder 25 letras.'],
        },
        price: {
            type: Number,
        },
        teacherName: {
            type: String,
            maxLength: [30, 'El nombre del profesor no puede exceder 30 letras.'],
        },
        teacherReview: {
            type: String,
        },
        paymentInfo: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

// Indexing course properties for optimized search
CourseSchema.index({ status: 1 });
CourseSchema.index({ modality: 1 });
CourseSchema.index({ courseName: 1 });
CourseSchema.index({ postalCode: 1 });

/* This is a middleware that runs before the save() or create() method. 
   It adds a custom pre-save middleware to validate startDate and endDate */
CourseSchema.pre('validate', function (next) {
    if (this.startDate && this.endDate && this.startDate >= this.endDate) {
        throw new AppError('La fecha fin debe de ir después de la fecha de inicio', 400);
    }
    return next();
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;

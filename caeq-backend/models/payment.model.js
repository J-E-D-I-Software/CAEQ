const mongoose = require('mongoose');

/*  This is the model for a payment receipt, not an invoice nor a bill
    * invoice: request for payment (contización)
    * receipt: proof that the invoice was fulfilled
    * bill: proof that a payment was made, normally issued by the billing platform
*/
const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'architect.user',
            required: [true, 'Usuario necesario'],
        },
        course: {
            type: mongoose.Schema.ObjectId,
            ref: 'Course',
            required: [true, 'Curso necesario'],
        },
        status: {
            type: String,
            enum: { values: ['Pendiente', 'Rechazado', 'Aceptado'] },
            required: [true, 'Status required'],
            default: 'Pendiente',
        },
        billImageURL: {
            type: String,
            validate: {
                validator: (value) =>
                    /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value),
                message: (props) => `${props.value} no es una URL válida`,
            },
            required: [true, 'Se necesita un comprobante de pago.'],
        },
    },
    { timestamps: true }
);

// Indexing payment properties for optimized search 
paymentSchema.index({ status: 1 });
paymentSchema.index({ course: 1 });
paymentSchema.index({ user: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

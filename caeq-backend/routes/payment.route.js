var express = require('express');
const filesController = require('../controllers/files.controller');

const router = express.Router();

const {
    createPayment,
    getPayment,
    getAllPayments,
    startPayment,
    acceptPayment,
    declinePayment,
} = require(`${__dirname}/../controllers/payment.controller.js`);
const {
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);
const fileParser = require('../utils/multipartParser');

// Middleware global para protección
router.use(protect);

// Rutas que requieren autenticación "architect"
router
    .route('/startPayment')
    .post(
        restrictTo('architect'),
        fileParser,
        filesController.formatPaymentImage,
        startPayment
    );

// Rutas que requieren autenticación "caeq"
router.use(protect, restrictTo('caeq'));
router.route('/acceptPayment')
    .patch(acceptPayment);
router.route('/declinePayment')
    .patch(declinePayment);

// Rutas que requieren autenticación "caeq"
router.use(restrictTo('caeq'));
router
    .route('/')
    .get(getAllPayments)
    .post(fileParser, filesController.formatPaymentImage, createPayment);
router.route('/:id').get(getPayment);

module.exports = router;

const express = require('express');

const router = express.Router();

const {
    getAllSpecialties,
    getSpecialty,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
} = require(`${__dirname}/../controllers/specialties.controller.js`);
const {
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);

router
    .route('/')
    .get(getAllSpecialties)
    .post(protect, restrictTo('caeq'), createSpecialty);
router
    .route('/:id')
    .get(getSpecialty)
    .patch(protect, restrictTo('caeq'), updateSpecialty)
    .delete(protect, restrictTo('caeq'), deleteSpecialty);

module.exports = router;
    const express = require('express');
    const {
        getSpecialties,
        getAnnuities,
    } = require('../controllers/filters.controller');
    const {
        protect, 
        restrictTo,

    } = require('../controllers/auth.controller');

    const router = express.Router();

    router.use(protect, restrictTo('caeq'));
    router.get('/get-specialties', getSpecialties);
    router.get('/get-annuities', getAnnuities);

    module.exports = router;
var express = require('express');
var router = express.Router();
const {
    getAllBenefits,
    getBenefit,
    createBenefit,
    updateBenefit,
    deleteBenefit,
} = require(`${__dirname}/../controllers/benefits.controller.js`);
const { protect, restrictTo } = require(`${__dirname}/../controllers/auth.controller.js`);

router 
    .route('/')
    .get(getAllBenefits)
    .post(
        protect,
        restrictTo('caeq'),
        createBenefit
    );

router
    .route('/:id')
    .get(getBenefit)
    .patch(
        protect,
        restrictTo('caeq'),
        updateBenefit
    )
    .delete(protect, restrictTo('caeq'), deleteBenefit);

module.exports = router;

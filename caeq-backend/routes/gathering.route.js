var express = require('express');
var router = express.Router();
const {
    getAllGatherings,
    getGathering,
    createGathering,
    updateGathering,
    deleteGathering,
} = require(`${__dirname}/../controllers/gathering.controller.js`);
const { protect, restrictTo } = require(`${__dirname}/../controllers/auth.controller.js`);
const filesController = require('../controllers/files.controller');
const fileParser = require('../utils/multipartParser');

router
    .route('/')
    .get(getAllGatherings)
    .post(
        protect,
        restrictTo('caeq'),
        fileParser,
        filesController.formatMoreInfo,
        createGathering
    );

router
    .route('/:id')
    .get(getGathering)
    .patch(
        protect,
        restrictTo('caeq'),
        fileParser,
        filesController.formatMoreInfo,
        updateGathering
    )
    .delete(protect, restrictTo('caeq'), deleteGathering);

module.exports = router;

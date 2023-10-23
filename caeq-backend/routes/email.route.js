var express = require('express');
var router = express.Router();
const {
    sendToEveryone,
} = require(`${__dirname}/../controllers/email.controller.js`);

const {
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);

const filesController = require('../controllers/files.controller');
const fileParser = require('../utils/multipartParser');

router.route('/')
    .post(protect, restrictTo('caeq'), fileParser, filesController.formatImage, sendToEveryone);

module.exports = router;
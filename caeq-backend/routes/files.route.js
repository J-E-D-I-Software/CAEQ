const express = require('express');
const filesController = require('../controllers/files.controller');

const router = express.Router();

const fileParser = require('../utils/multipartParser');

router.route('/image').post(fileParser, filesController.formatImage);
router.route('/pdf').post(fileParser, filesController.formatPDF);

module.exports = router;

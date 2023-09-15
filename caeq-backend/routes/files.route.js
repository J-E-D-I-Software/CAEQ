const express = require('express');
const filesController = require('../controllers/files.controller');

const router = express.Router();

const fileParser = require('../utils/multipartParser');

router.route('/').post(fileParser, filesController.formatCourseImage);

module.exports = router;

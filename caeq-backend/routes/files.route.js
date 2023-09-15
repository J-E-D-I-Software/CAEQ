const express = require('express');
const filesController = require('/controllers/filestorage.controller');

const router = express.Router();

const fileParser = require('/utils/multipartParser');

router.route('/test').post(fileParser, filesController.formatCourseImage);

module.exports = router;

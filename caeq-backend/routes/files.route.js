const express = require('express');
const filesController = require('/controllers/filestorage.controller');

const router = express.Router();

const {
    testFile,
} = require(`${__dirname}/../controllers/files.controller.js`);
const fileParser = require('/utils/multipartParser');


router
    .route('/test')
    .get(testFile)
    .post(
        fileParser.single('courseImage'),
        filesController.formatCourseImage
    );

module.exports = router;
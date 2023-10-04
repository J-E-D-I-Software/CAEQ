var express = require('express');
var router = express.Router();
const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} = require(`${__dirname}/../controllers/course.controller.js`);
const filesController = require('../controllers/files.controller');
const fileParser = require('../utils/multipartParser');

router.post('/', fileParser, filesController.formatImage)
router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse);

module.exports = router;

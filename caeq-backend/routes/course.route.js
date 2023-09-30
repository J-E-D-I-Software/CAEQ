var express = require('express');
var router = express.Router();
const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} = require(`${__dirname}/../controllers/course.controller.js`);

router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse);

module.exports = router;

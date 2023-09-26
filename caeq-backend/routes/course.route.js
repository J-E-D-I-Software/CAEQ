var express = require('express');
var router = express.Router();
const {
    getAllCourses,
    getCourse,
    createCouse,
    updateCourse,
    deleteCourse,
} = require(`${__dirname}/../controllers/course.controller.js`);

router.route('/').get(getAllCourses).post(createCouse);
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse);

module.exports = router;

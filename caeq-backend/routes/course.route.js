var express = require('express');
var router = express.Router();
const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    calculateAccreditedInscription,
} = require(`${__dirname}/../controllers/course.controller.js`);
const {
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);
const filesController = require('../controllers/files.controller');
const fileParser = require('../utils/multipartParser');
const sendEmailNotification = require(`${__dirname}/../controllers/email.controller.js`);

router
    .route('/')
    .get(getAllCourses)
    .post(
        protect,
        restrictTo('caeq'),
        fileParser,
        filesController.formatImage,
        createCourse,
    )

router
    .route('/:id')
    .get(getCourse)
    .patch(
        protect,
        restrictTo('caeq'),
        fileParser,
        filesController.formatImage,
        updateCourse
    )
    .delete(protect, restrictTo('caeq'), deleteCourse);
router.route('/accredited/:id').patch(calculateAccreditedInscription);

module.exports = router;

var express = require('express');
var router = express.Router();
const {
    createArchitectUser,
    getArchitectUser,
    getAllArchitectUsers,
    updateArchitectUser,
    deleteArchitectUser,
    getAllPublicArchitectUsers,
    getAllRegistrationRequests,
    acceptArchitectUser,
    rejectArchitectUser,
} = require(`${__dirname}/../controllers/architect.user.controller.js`);

const {
    loginArchitectUser,
    signUpArchitectUser,
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);
const {
    forgotPasswordArchitectUser,
    resetPasswordArchitectUser,
} = require(`${__dirname}/../controllers/password.controller.js`);
const filesController = require('../controllers/files.controller');
const fileParser = require('../utils/multipartParser');

router.get('/public', getAllPublicArchitectUsers);
router.post('/auth/signup', fileParser, filesController.formatCV, signUpArchitectUser);
router.post('/auth/login', loginArchitectUser);
router.post('/forgot-password', forgotPasswordArchitectUser);
router.patch('/reset-password/:token', resetPasswordArchitectUser);

router.route('/accept-architect/:id').patch(acceptArchitectUser);
router.route('/reject-architect/:id').patch(rejectArchitectUser);

router
    .route('/registration-requests')
    .get(protect, restrictTo('caeq'), getAllRegistrationRequests);

router.route('/').get(getAllArchitectUsers).post(createArchitectUser);
router
    .route('/:id')
    .get(protect, restrictTo('caeq', 'self'), getArchitectUser)
    .patch(
        protect,
        restrictTo('caeq', 'self'),
        fileParser,
        filesController.formatCV,
        updateArchitectUser
    )
    .delete(protect, restrictTo('caeq', 'self'), deleteArchitectUser);

module.exports = router;

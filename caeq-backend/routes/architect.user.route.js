var express = require('express');
var router = express.Router();
const {
    createArchitectUser,
    getArchitectUser,
    getAllArchitectUsers,
    updateArchitectUser,
    deleteArchitectUser,
} = require(`${__dirname}/../controllers/architect.user.controller.js`);


const {
    loginArchitectUser,
    signUpArchitectUser,
    protect,
} = require(`${__dirname}/../controllers/auth.controller.js`);
const filesController = require('../controllers/files.controller');
const fileParser = require('../utils/multipartParser');

router.post('/auth/signup', fileParser, filesController.formatCV, signUpArchitectUser);
router.post('/auth/login', loginArchitectUser);

router.route('/').get(getAllArchitectUsers).post(createArchitectUser)
router
    .route('/:id')
    .get(getArchitectUser)
    .patch(updateArchitectUser)
    .delete(deleteArchitectUser);

module.exports = router;
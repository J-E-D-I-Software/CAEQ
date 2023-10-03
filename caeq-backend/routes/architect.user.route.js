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
const {
    forgotPasswordArchitectUser,
    resetPasswordArchitectUser,
  } = require(`${__dirname}/../controllers/password.controller.js`);

router.post('/auth/signup', signUpArchitectUser);
router.post('/auth/login', loginArchitectUser);
router.post("/forgot-password", forgotPasswordArchitectUser);
router.post("/reset-password/:token", resetPasswordArchitectUser);
router.route('/').get(getAllArchitectUsers).post(createArchitectUser);
router
    .route('/:id')
    .get(getArchitectUser)
    .patch(updateArchitectUser)
    .delete(deleteArchitectUser);

module.exports = router;

var express = require('express');
var router = express.Router();
const {
    createCaeqUser,
    getCaeqUser,
    getAllCaeqUsers,
    updateCaeqUser,
    deleteCaeqUser,
} = require(`${__dirname}/../controllers/caeq.user.controller.js`);
const {
    loginCaeqUser,
    signUpCaeqUser,
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);

router.post('/auth/signup', signUpCaeqUser);
router.post('/auth/login', loginCaeqUser);

router.use(protect, restrictTo('caeq'));
router.route('/').get(getAllCaeqUsers).post(createCaeqUser);
router.route('/:id').get(getCaeqUser).patch(updateCaeqUser).delete(deleteCaeqUser);

module.exports = router;

var express = require('express');
var router = express.Router();
const {
    createCaeqUser,
    getCaeqUser,
    getAllCaeqUsers,
    updateCaeqUser,
    deleteCaeqUser,
} = require(`${__dirname}/../controllers/caeq.user.controller.js`);

router.route('/').get(getAllCaeqUsers).post(createCaeqUser);
router.route('/:id').get(getCaeqUser).patch(updateCaeqUser).delete(deleteCaeqUser);

module.exports = router;

var express = require('express');
var router = express.Router();
const {
    createArchitectUser,
    getArchitectUser,
    getAllArchitectUsers,
    updateArchitectUser,
    deleteArchitectUser,
} = require(`${__dirname}/../controllers/architect.user.controller.js`);

router.route('/').get(getAllArchitectUsers).post(createArchitectUser);
router
    .route('/:id')
    .get(getArchitectUser)
    .patch(updateArchitectUser)
    .delete(deleteArchitectUser);

module.exports = router;

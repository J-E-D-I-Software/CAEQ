var express = require('express');
const { myCourseHours } = require('../controllers/inscription.controller');
var router = express.Router();

const {
    createInscription,
    getInscription,
    getAllInscriptions,
    deleteInscription,
    inscribeTo,
    myInscriptions,
} = require(`${__dirname}/../controllers/inscription.controller.js`);
const {
    protect,
    restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);

router.route('/myCourseHours/:id').get(myCourseHours);
router.use(protect);
router.route('/inscribeTo').post(restrictTo('architect'), inscribeTo);
router.route('/myInscriptions').get(myInscriptions);

router.use(restrictTo('caeq'));
router.route('/').get(getAllInscriptions).post(createInscription);
router.route('/:id').get(getInscription).delete(deleteInscription);
module.exports = router;

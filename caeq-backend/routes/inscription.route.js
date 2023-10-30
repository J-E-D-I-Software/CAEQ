var express = require('express');
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

router.use(protect);
router.route('/inscribeTo').post(restrictTo('architect'), inscribeTo);
router.route('/myInscriptions').get(restrictTo('architect'), myInscriptions);

router.use(restrictTo('caeq'));
router.route('/').get(getAllInscriptions).post(createInscription);
router.route('/:id').get(getInscription).delete(deleteInscription);

module.exports = router;
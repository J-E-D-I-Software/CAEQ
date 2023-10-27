const express = require('express');
const router = express.Router();

const {
    createInscription,
    getInscription,
    getAllInscriptions,
    deleteInscription,
    inscribeTo,
    myInscriptions,
} = require('../controllers/inscription.controller');
const { protect, restrictTo } = require('../controllers/authentication.controller');

// Middleware para proteger todas las rutas debajo de esta línea
router.use(protect);

// Rutas accesibles solo para usuarios con el rol 'ArchitectUser'
router.route('/inscribeTo').post(restrictTo('ArchitectUser'), inscribeTo);
router.route('/myInscriptions').get(restrictTo('ArchitectUser'), myInscriptions);

// Rutas accesibles solo para el rol de 'Admin'
router.use(restrictTo('Admin'));
router.route('/').get(getAllInscriptions).post(createInscription);
router.route('/:id').get(getInscription).delete(deleteInscription);

module.exports = router;

var express = require('express');
var router = express.Router();
const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
} = require(`${__dirname}/../controllers/services.controller.js`);
const { protect, restrictTo } = require(`${__dirname}/../controllers/auth.controller.js`);
const filesController = require('../controllers/files.controller');
const fileParser = require('../utils/multipartParser');

router 
    .route('/')
    .get(getAllRooms)
    .post(
        protect,
        restrictTo('caeq'),
        fileParser,
        filesController.formatRoomPhoto,
        createRoom
    );

router
    .route('/:id')
    .get(getRoom)
    .patch(
        protect,
        restrictTo('caeq'),
        fileParser,
        filesController.formatRoomPhoto,
        updateRoom
    )
    .delete(protect, restrictTo('caeq'), deleteRoom);

module.exports = router;
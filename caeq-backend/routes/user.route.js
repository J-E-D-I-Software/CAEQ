var express = require('express');
var router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require(`${__dirname}/../controllers/caeq.user.controller.js`);

router.get('/', getAllUsers);
router.get('/user/:id', getUser);
router.post('/user', createUser);
router.patch('/user', updateUser);
router.delete('/user', deleteUser);

module.exports = router;

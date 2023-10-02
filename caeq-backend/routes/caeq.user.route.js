var express = require("express");
var router = express.Router();
const {
  createCaeqUser,
  getCaeqUser,
  getAllCaeqUsers,
  updateCaeqUser,
  deleteCaeqUser,
  acceptCaeqUser,
  rejectCaeqUser,
} = require(`${__dirname}/../controllers/caeq.user.controller.js`);
const {
  loginCaeqUser,
  signUpCaeqUser,
  protect,
  restrictTo,
} = require(`${__dirname}/../controllers/auth.controller.js`);
const {
  forgotPasswordCaeqUser,
  resetPasswordCaeqUser,
} = require(`${__dirname}/../controllers/password.controller.js`);

router.post("/auth/signup", signUpCaeqUser);
router.post("/auth/login", loginCaeqUser);
router.post("/forgot-password", forgotPasswordCaeqUser);
router.patch("/reset-password/:token", resetPasswordCaeqUser);

router.use(protect, restrictTo("caeq"));
router.patch("/acceptadmin", acceptCaeqUser);
router.patch("/rejectadmin", rejectCaeqUser);

router.route("/").get(getAllCaeqUsers).post(createCaeqUser);
router
  .route("/:id")
  .get(getCaeqUser)
  .patch(updateCaeqUser)
  .delete(deleteCaeqUser);

module.exports = router;

const router = require("express").Router();
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  getAllUsers,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router
  .route("/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

module.exports = router;

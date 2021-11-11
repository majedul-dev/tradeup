const router = require("express").Router();
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const {
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetailsById,
  updateUserByAdmin,
  deleteUserByAdmin,
  getUserById,
} = require("../controllers/userController");

router.route("/me").get(isAuthenticated, getUserProfile);
router.route("/me/password/update").put(isAuthenticated, updatePassword);
router.route("/me/profile/update").put(isAuthenticated, updateProfile);
router.route("/user/:id").get(getUserById);
router
  .route("/admin/allusers")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getUserDetailsById);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateUserByAdmin);
router
  .route("/admin/user/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUserByAdmin);

module.exports = router;

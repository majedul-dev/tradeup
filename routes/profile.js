const router = require("express").Router();
const { getMyProfile } = require("../controllers/profileController");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/me").get(isAuthenticated, getMyProfile);

module.exports = router;

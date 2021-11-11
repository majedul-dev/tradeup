const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  createConversation,
  getUserConversation,
} = require("../controllers/conversationController");

router.route("/").post(isAuthenticated, createConversation);
router.route("/:userId").get(isAuthenticated, getUserConversation);

module.exports = router;

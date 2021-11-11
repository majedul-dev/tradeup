const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  createMessage,
  getMessage,
} = require("../controllers/messageController");

router.route("/").post(isAuthenticated, createMessage);
router.route("/:conversationId").get(isAuthenticated, getMessage);

module.exports = router;

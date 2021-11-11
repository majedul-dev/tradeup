const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  createOffer,
  getOffers,
  getMyProductOffers,
  getOfferById,
  getMyOffers,
  deleteOffer,
  trackOffer,
} = require("../controllers/offerController");

router.route("/myoffers").get(isAuthenticated, getMyOffers);
router.route("/").get(isAuthenticated, getOffers);
router.route("/:id").get(isAuthenticated, getOfferById);
router.route("/:id").post(isAuthenticated, createOffer);
router.route("/:id").delete(isAuthenticated, deleteOffer);
router.route("/my/:productId").get(isAuthenticated, getMyProductOffers);
router.route("/:id").put(isAuthenticated, trackOffer);

module.exports = router;

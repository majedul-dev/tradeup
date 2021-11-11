const router = require("express").Router();
const {
  allProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getOwnProducts,
  getUsersProductsByUserId,
  getMyProductOffers,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/getall").get(allProducts);
router.route("/my").get(isAuthenticated, getOwnProducts);
// router.route("/my/:id").get(isAuthenticated, getMyProductOffers);
router.route("/:userId").get(getUsersProductsByUserId);
router.route("/getsingle/:id").get(getSingleProduct);
router.route("/create").post(isAuthenticated, createProduct);
router.route("/delete/:id").delete(isAuthenticated, deleteProduct);
router.route("/edit/:id").put(isAuthenticated, updateProduct);

module.exports = router;

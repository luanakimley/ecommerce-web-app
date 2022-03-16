const router = require(`express`).Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOneOrder,
  returnItem,
} = require("../controllers/orders");
const { verifyUsersJWTPassword } = require("../controllers/users");

router.get("/orders", getAllOrders);
router.post("/orders", jsonParser, createOrder);
router.get("/orders/user/:userId", verifyUsersJWTPassword, getUserOrders);
router.get("/orders/:id", verifyUsersJWTPassword, getOneOrder);

module.exports = router;

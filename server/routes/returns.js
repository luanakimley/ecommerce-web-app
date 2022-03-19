const router = require(`express`).Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();

const {
  returnOrder,
  getAllReturns,
  getOneReturn,
  getUserReturns,
} = require("../controllers/returns");
const { verifyUsersJWTPassword } = require("../controllers/users");

router.post("/return", jsonParser, returnOrder);
router.get("/return", getAllReturns);
router.get("/return/user/:userId", verifyUsersJWTPassword, getUserReturns);
router.get("/return/:id", verifyUsersJWTPassword, getOneReturn);

module.exports = router;

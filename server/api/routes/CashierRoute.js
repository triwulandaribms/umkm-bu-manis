const express= require( "express");
const {
  addCashierProduct,
  deleteAllProductCashier,
  deleteProductCashier,
  getAllProductCashier,
}= require( "../controllers/CashierController.js");

const router = express.Router();

router.get("/get-all", getAllProductCashier);
router.post("/add", addCashierProduct);
router.delete("/delete/:id", deleteProductCashier);
router.delete("/delete-all", deleteAllProductCashier);

module.exports = router;

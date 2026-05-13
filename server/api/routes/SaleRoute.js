const express = require("express");
const {
  addSalesCustomer,
  getBestCustomer,
  getBestProduct,
  getSaleByIdCustomer,
  getSalesReport,
} = require("../controllers/SaleController");

const router = express.Router();

router.get("/get-sales-report", getSalesReport);
router.get("/get-best-product", getBestProduct);
router.get("/get-best-customer", getBestCustomer);
router.post("/add", addSalesCustomer);
router.get("/get/:id", getSaleByIdCustomer);

module.exports = router;

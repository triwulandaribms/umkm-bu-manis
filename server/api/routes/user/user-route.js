const express = require( "express");
const {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} = require("../../controllers/product/ProductController.js");

const {
    addSalesCustomer,
    getBestCustomer,
    getBestProduct,
    getSaleByIdCustomer,
    getSalesReport,
} = require("../../controllers/sale/SaleController.js");
  
  
const {
    addCashierProduct,
    deleteAllProductCashier,
    deleteProductCashier,
    getAllProductCashier,
} = require( "../../controllers/cashier/CashierController.js");

const {
    deleteCodeVoucher,
    getCodeVoucher,
} = require( "../../controllers/voucher/CodeVoucher.js");

const router = express.Router();

// route untuk produk
router.get("/get-all-product", getAllProduct);
router.get("/get-product-by/:id", getProductById);
router.post("/add-product", addProduct);
router.put("/update-product-by/:id", updateProduct);
router.delete("/delete-product-by/:id", deleteProduct);

// route untuk aktivitas penjualan
router.get("/get-sales-report", getSalesReport);
router.get("/get-best-product", getBestProduct);
router.get("/get-best-customer", getBestCustomer);
router.post("/add-sale", addSalesCustomer);
router.get("/get-sale-by/:id", getSaleByIdCustomer);
  
  
// route untuk aktivitas kasir
router.get("/get-all-cashier", getAllProductCashier);
router.post("/add-cashier", addCashierProduct);
router.delete("/delete/:id", deleteProductCashier);
router.delete("/delete-all", deleteAllProductCashier);


// route untuk voucher
router.get("/get-voucher-by/:id", getCodeVoucher); 
router.delete("/delete/:id", deleteCodeVoucher); 


  
module.exports = router;

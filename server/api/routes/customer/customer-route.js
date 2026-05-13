const express = require( "express");
const {
  getCartByIdCustomer,
  addCart,
  updateCart,
  deleteCart,
} = require( "../../controllers/cart/CartController.js");

const {
    getAllProduct
} = require("../../controllers/product/ProductController.js");

const router = express.Router();

// route untuk melihat produk
router.get("/get-all-product", getAllProduct);

// route untuk aktivitas belanja 
router.get("/get-cart-by/:id", getCartByIdCustomer); 
router.post("/add-cart", addCart); 
router.put("/update-cart-by/:id", updateCart); 
router.delete("/delete-cart-by/:id", deleteCart);

module.exports = router;

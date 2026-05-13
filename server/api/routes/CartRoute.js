const express = require( "express");
const { verifyToken } = require( "../middleware/AuthMiddleware.js");
const {
  getCartByIdCustomer,
  addCart,
  updateCart,
  deleteCart,
} = require( "../controllers/CartController.js");

const router = express.Router();

router.get("/get/:id", getCartByIdCustomer); // Router untuk mendapatkan keranjang by id customer
router.post("/add", addCart); // Router untuk menambahkan data keranjang
router.put("/update/:id", updateCart); // Router untuk mengubah data keranjang berdasarkan id
router.delete("/delete/:id", deleteCart); // Router untuk menghapus data keranjang berdasarkan id

module.exports = router;

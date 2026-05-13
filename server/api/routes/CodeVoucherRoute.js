const express = require( "express");
const { verifyToken } = require( "../middleware/AuthMiddleware.js");
const {
  deleteCodeVoucher,
  getCodeVoucher,
} = require( "../controllers/CodeVoucher.js");

const router = express.Router();

router.get("/get/:id", getCodeVoucher); // Router untuk mendapatkan kode voucher by id customer
router.delete("/delete/:id", deleteCodeVoucher); // Router untuk menghapus data kode voucher berdasarkan id

module.exports = router;

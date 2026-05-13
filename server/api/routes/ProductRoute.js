const express = require( "express");
const {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} = require("../controllers/ProductController.js");

const router = express.Router();

router.get("/get-all", getAllProduct);
router.get("/get/:id", getProductById);
router.post("/add", addProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;

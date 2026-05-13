const express= require("express");
const {
  registerAccountCustomer,
  deleteAccountCustomer,
  updateAccountCustomer,
  loginAccountCustomer,
} = require("../controllers/CustomerController.js");

const router = express.Router();

router.post("/register-customer", registerAccountCustomer);
router.post("/login-customer", loginAccountCustomer)
router.put("/update-customer/:id", updateAccountCustomer);
router.delete("/delete-customer", deleteAccountCustomer);

module.exports = router;

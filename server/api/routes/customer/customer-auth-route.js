const express= require("express");
const {
  registerAccountCustomer,
  loginAccountCustomer,
  logoutAccountCustomer
} = require("../../controllers/customer/customer-auth-controller.js");

const router = express.Router();

router.post("/register-customer", registerAccountCustomer);
router.post("/login-customer", loginAccountCustomer);
router.get("/logout-customer", logoutAccountCustomer);

module.exports = router;

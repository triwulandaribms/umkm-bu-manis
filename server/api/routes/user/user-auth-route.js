const express = require( "express");
const {
  registerAccountAdmin,
  deleteAccountUser,
  getCurrentUser,
  loginAccountAdmin,
  logoutAccount,
  updateAccountUser,
  getAllUser,
} = require("../../controllers/user/user-auth-controller.js");

const {
  getAllCustomer,
  registerAccountCustomer,
  updateAccountCustomer,
  deleteAccountCustomer
} = require("../../controllers/customer/customer-auth-controller.js");

const router = express.Router();

router.post("/register-admin", registerAccountAdmin);
router.post("/login-admin", loginAccountAdmin);
router.get("/logout", logoutAccount);

router.get("/get-all-customer", getAllCustomer);
router.post("/register-customer", registerAccountCustomer);
router.put("/update-customer/:id", updateAccountCustomer);
router.delete("/delete-customer", deleteAccountCustomer);

router.get("/my-account", getCurrentUser);
router.get("/get-all-user", getAllUser);
router.put("/update-user/:id", updateAccountUser);
router.delete("/delete-user", deleteAccountUser);

module.exports = router;

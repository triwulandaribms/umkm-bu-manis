require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./config/db");

require("./models/Relasi");


const ProductRoute = require("./routes/ProductRoute");
const AdminRoute = require("./routes/AdminRoute");
const CartRoute = require("./routes/CartRoute");
const CodeVoucherRoute = require("./routes/CodeVoucherRoute");
const SaleRoute = require("./routes/SaleRoute");
const CustomerRoute = require("./routes/CustomerRoute");
const CashierRoute = require("./routes/CashierRoute");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", AdminRoute);
app.use("/api/customer", CustomerRoute);
app.use("/api/product", ProductRoute);
app.use("/api/sale", SaleRoute);
app.use("/api/cashier", CashierRoute);
app.use("/api/cart", CartRoute);
app.use("/api/code", CodeVoucherRoute);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Terhubung ke database");

    await sequelize.sync({ alter: true });
    console.log("Sinkronisasi database berhasil");

    app.listen(process.env.API_PORT, () =>
      console.log("Server berhasil dijalankan")
    );
  } catch (err) {
    console.error("Error database:", err.message);
  }
})();

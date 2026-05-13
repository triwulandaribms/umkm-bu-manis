require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./config/db.js");

require("./models/Relasi.js");


const UserAuthRoute = require("./routes/user/user-auth-route.js");
const UserRoute = require("./routes/user/user-route.js");

const CustomerAuthRoute = require("./routes/customer/customer-auth-route.js");
const CustomerRoute = require("./routes/customer/customer-route.js");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


const router = express.Router();
app.use("/api", router);

router.use("/user/auth",UserAuthRoute);
router.use("/user", UserRoute);

router.use("/customer/auth", CustomerAuthRoute);
router.use("/customer", CustomerRoute);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Terhubung ke database");

    await sequelize.sync({ alter: true });
    console.log("Sinkronisasi database berhasil");

    app.listen(process.env.API_PORT, () => {
      console.log(`Server berjalan di port ${process.env.API_PORT}`);
    });

  } catch (err) {
    console.error("Error database:", err.message);
  }
})();
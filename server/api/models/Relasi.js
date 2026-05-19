const User = require("./User");
const Customer = require("./Customer");
const Product = require("./Product");
const Sales = require("./Sales");
const Cart = require("./Cart");
const CashierProduct = require("./CashierProduct");
const CodeVoucher = require("./CodeVoucher");


Sales.belongsTo(Customer, {
  foreignKey: "id_customer",
  as: "customer",
});

Customer.hasMany(Sales, {
  foreignKey: "id_customer",
  as: "sales",
});

Sales.belongsTo(Product, {
  foreignKey: "id_product",
  as: "product",
});

Product.hasMany(Sales, {
  foreignKey: "id_product",
  as: "sales",
});


Cart.belongsTo(Customer, {
  foreignKey: "id_customer",
});
Customer.hasMany(Cart, {
  foreignKey: "id_customer",
});

Cart.belongsTo(Product, {
  foreignKey: "id_product",
});
Product.hasMany(Cart, {
  foreignKey: "id_product",
});



CashierProduct.belongsTo(Product, {
  foreignKey: "id_product",
});
Product.hasMany(CashierProduct, {
  foreignKey: "id_product",
});


CodeVoucher.belongsTo(Customer, {
  foreignKey: "id_customer",
});
Customer.hasMany(CodeVoucher, {
  foreignKey: "id_customer",
});

module.exports = {
  User,
  Customer,
  Product,
  Sales,
  Cart,
  CashierProduct,
  CodeVoucher,
};
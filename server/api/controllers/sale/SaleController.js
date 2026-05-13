const { sequelize } = require("../../config/db");
const { Op, fn, col, literal } = require("sequelize");
const Sales = require("../../models/Sales");
const Product = require("../../models/Product");
const Customer = require("../../models/Customer");
const Cart = require("../../models/Cart");
const VoucherCode = require("../../models/CodeVoucher");

exports.addSalesCustomer = async (req, res) => {
  const {
    id_customer,
    sales,
    sub_total,
    discount,
    total_sale,
    type_of_payment,
    address,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    for (const sale of sales) {
      const { id, id_product, total_product } = sale;

      const product = await Product.findByPk(id_product, { transaction: t });

      if (!product) {
        throw new Error("Produk tidak ditemukan");
      }

      if (product.stock < total_product) {
        throw new Error("Stok tidak mencukupi");
      }

      await Sales.create({
        id_customer,
        id_product,
        total_product,
        sub_total,
        discount,
        total_sale,
        type_of_payment,
        address,
      }, { transaction: t });

      await product.update({
        stock: product.stock - total_product
      }, { transaction: t });

      await Cart.destroy({
        where: { id },
        transaction: t
      });
    }

    const totalQuantity = await Sales.sum("total_product", {
      where: { id_customer },
      transaction: t
    });

    if (totalQuantity >= 1000) {
      await VoucherCode.findOrCreate({
        where: {
          id_customer,
          code: "DISKON30"
        },
        defaults: {
          discount: 30
        },
        transaction: t
      });
    }

    await t.commit();

    res.status(200).json({
      message: "Pesanan telah berhasil dibuat"
    });

  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getSalesReport = async (_req, res) => {

  try {
    
    const sales = await Sales.findAll({
      attributes: [
        "id",
        "total_product",
        "discount",
        "total_sale",
        "type_of_payment",
        "createdAt"
      ],
      include: [{
        model: Customer,
        as: "customer",
        attributes: ["customer_code"]
      }]
    });

    res.status(200).json(sales);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

exports.getBestProduct = async (_req, res) => {

  try {
    const products = await Product.findAll({
      subQuery: false,
    
      attributes: [
        "id",
        "name",
        "price",
        "image",
        [
          sequelize.fn(
            "SUM",
            sequelize.col("sales.total_product")
          ),
          "total_sales",
        ],
      ],
    
      include: [
        {
          model: Sales,
          as: "sales",
          attributes: [],
        },
      ],
    
      group: ["product.id"],
    
      order: [
        [sequelize.literal("total_sales"), "DESC"]
      ],
    
      limit: 3,
    });

    res.status(200).json(products);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

exports.getBestCustomer = async (_req, res) => {

  try {

    const customers = await Customer.findAll({
      subQuery: false,
    
      attributes: [
        "id",
        "name",
        [
          sequelize.fn(
            "SUM",
            sequelize.col("sales.total_product")
          ),
          "total_sales",
        ],
      ],
    
      include: [
        {
          model: Sales,
          as: "sales",
          attributes: [],
        },
      ],
    
      where: {
        id: {
          [Op.ne]: 1,
        },
      },
    
      group: ["customer.id"],
    
      order: [
        [sequelize.literal("total_sales"), "DESC"]
      ],
    
      limit: 3,
    });

    res.status(200).json(customers);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

exports.getSaleByIdCustomer = async (req, res) => {

  try {

    const id_customer = req.params.id;

    if (!id_customer) {
      return res.status(400).json({
        message: "id_customer wajib diisi"
      });
    }

    const sales = await Sales.findAll({
      where: {
        id_customer
      },
        attributes: [
          "id",
          "total_product",
          "type_of_payment"
        ],
        include: [{
          model: Product,
          as: "product",
          attributes: ["name", "image", "price"]
        }]
      });

      res.status(200).json(sales);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
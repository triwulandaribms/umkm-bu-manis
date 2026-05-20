const { sequelize } = require("../../config/db");
const Sales = require("../../models/Sales");
const Product = require("../../models/Product");
// const Customer = require("../../models/Customer");
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

    const [sales] = await sequelize.query(
      `
        SELECT 
          s.id_customer,
          s.id_product,
          p.name AS product_name,
          p.price,
          p.image,
        CASE
          WHEN s.id_customer = 1 THEN 'UMUM'
          ELSE c.customer_code
        END AS customer_code,
        CASE
          WHEN s.id_customer = 1 THEN 'UMUM'
          ELSE 'MEMBER'
        END AS customer_type,
        s.type_of_payment,
        DATE(s."createdAt") AS sale_day,
        SUM(s.sub_total) AS sub_total,
        SUM(s.discount) AS discount,
        SUM(s.total_sale) AS total_sale,
        MAX(s."createdAt") AS sale_date
        FROM "sales" s
              LEFT JOIN "customer" c
                ON c.id = s.id_customer
              LEFT JOIN "product" p
                ON p.id = s.id_product  
        GROUP BY
          s.id_customer,
            s.id_product,
            p.name,
            p.price,
            p.image,
            c.customer_code,
            s.type_of_payment,
            DATE(s."createdAt")
        ORDER BY sale_date desc
      `
  );

    return res.status(200).json(sales);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }
};

exports.getBestProduct = async (_req, res) => {

  try {

    const [products] = await sequelize.query(
      `
     SELECT
        p.id,
        p.name,
        p.price,
        p.image,
        SUM(s.total_product) AS total_sales
      FROM "product" p
      LEFT JOIN "sales" s
      ON s.id_product = p.id
      GROUP BY
              p.id,
              p.name,
              p.price,
              p.image
      ORDER BY total_sales DESC
      LIMIT 3
      `
  );

    return res.status(200).json(products);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
      stack: error.stack
    });

  }
};

exports.getBestCustomer = async (_req, res) => {

  try {

    const [customers] = await sequelize.query(
      `
      SELECT
        c.id,
        c.name,
        c.customer_code,
        COALESCE(
          SUM(s.total_product),
          0
        ) AS total_sales
      FROM "customer" c
      LEFT JOIN "sales" s
      ON s.id_customer = c.id
      WHERE c.id != 1
      GROUP BY
              c.id,
              c.name,
              c.customer_code
      ORDER BY total_sales DESC
      LIMIT 3
      `
    );

    return res.status(200).json(customers);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
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

    const [sales] = await sequelize.query(
      `
      SELECT
          s.id,
          s.total_product,
          s.type_of_payment,
          s.sub_total,
          s.discount,
          s.total_sale,
          s."createdAt",
          p.name,
          p.image,
          p.price
      FROM "sales" s
      LEFT JOIN "product" p
      ON p.id = s.id_product
      WHERE s.id_customer = :id_customer
      ORDER BY s."createdAt" desc
      `, {
      replacements: {
        id_customer
      }
    });

    return res.status(200).json(sales);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }
};
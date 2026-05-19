const CashierProduct = require("../../models/CashierProduct.js");
const Product = require("../../models/Product.js");

exports.addCashierProduct = async (req, res) => {
    
  try {
    
    const { id_product, total_product, price} = req.body;
    
    const sub_total = total_product * price;

    const result = await CashierProduct.create({
      id_product,
      total_product,
      price,
      sub_total,
    })
    
    res.status(201).json({ msg: "Sukses", data: result});
    
  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });

  }
};

exports.updateCashier = async (req, res) => {
  try {
    const { id } = req.params;
    const { total_product, sub_total } = req.body;

    const cashier = await CashierProduct.update(
      {
        total_product,
        sub_total,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      message: "Cashier updated",
      data: cashier,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllProductCashier = async (_req, res) => {
  try {
    const result = await CashierProduct.findAll({
      where: {
        deletedAt: null
      },
    
      attributes: ['id', 'total_product', 'id_product', 'price', 'sub_total'],
    
      include: [
        {
          model: Product,
          attributes: ['name']
        }
      ]
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

exports.deleteProductCashier = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID harus diisi."
      });
    }

    const resultData = await CashierProduct.findOne({
      where: {
        id,
        deletedAt: null
      }
    });

    if (!resultData) {
      return res.status(404).json({
        message: "Data kasir tidak ditemukan"
      });
    }

    await resultData.update({
      deletedAt: new Date()
    });

    return res.status(200).json({
      message: `Data kasir dengan id ${id} berhasil dihapus`
    });

  } catch (error) {

    console.error("Gagal:", error.message);

    return res.status(500).json({
      message: "Terjadi kesalahan server"
    });
  }
};

exports.deleteAllProductCashier = async (req, res) => {
  try {

    await CashierProduct.update(
      {
        deletedAt: new Date()
      },
      {
        where: {
          deletedAt: null
        }
      }
    );

    return res.status(200).json({
      message: "Sukses data kasir dihapus"
    });

  } catch (error) {

    console.error("Gagal:", error.message);

    return res.status(500).json({
      message: "Terjadi kesalahan server"
    });
  }
};
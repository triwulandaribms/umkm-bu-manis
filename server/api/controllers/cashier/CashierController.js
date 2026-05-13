const CashierProduct = require("../../models/CashierProduct.js");
const Product = require("../../models/Product.js");

exports.addCashierProduct = async (req, res) => {
    
  try {
    
    const { id_product, total_product, price } = req.body;
    
    const sub_total = total_product * price;

    const result = await CashierProduct.create({
      id_product,
      total_product,
      price,
      sub_total
    })
    
    res.status(201).json({ msg: "Sukses", data: result});
    
  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });

  }
};

exports.getAllProductCashier = async (_req, res) => {
  try {
    const result = await CashierProduct.findAll({
      attributes: ['id', 'total_product', 'id_product', 'price', 'sub_total'],
      inlcude:[
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

    await CashierProduct.findOne({
      where: {id}
    })
    res.status(201).json({
      message: `Data kasir dengan id  ${id} sudah terhapus`    
    });
  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.deleteAllProductCashier = async (req, res) => {
  try {

    await CashierProduct.findAll();
    res.status(201).json({
      message: `sukses data kasir dihapus`    
    });

  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server"});
  }
};


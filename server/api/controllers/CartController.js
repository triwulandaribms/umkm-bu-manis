const  Cart  = require("../models/Cart.js");
const  Product  = require("../models/Product.js");


exports.getCartByIdCustomer = async (req, res) => {
  
  try {

    const { id_customer } = req.params;

    const dataCart = await Cart.findAll({
      where: { id_customer},
      attributes: ["id", "id_product", "total_produk"]
    });

    if (dataCart.length === 0) {
      return res.status(404).json({ message: "Keranjang kosong" });
    }

    const productId = dataCart.map(field => field.id_product);

    const dataProduct = await Product.findAll({
      where: { id: productId },
      attributes: ["id", "name", "image", "price"]
    });

    const dataGabung = dataCart.map(field => {

      const product = dataProduct.find(p => p.id === field.id_product);

      return {
        id: field.id,
        id_product: field.id_product,
        total_produk: field.total_produk,
        product: product ? {
          name: product.name,
          image: product.image,
          price: product.price
        } : null
      };
    });

    res.status(200).json(dataGabung);

  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server"});
  }
};

// exports.getCartByIdCustomer = async (req, res) => {
//   try {
//     const { id_customer } = req.params;

//     const dataCart = await Cart.findAll({
//       where: { id_customer },
//       include: [{
//         model: Product,
//         attributes: ["id", "name", "image", "price"]
//       }]
//     });

//     if (dataCart.length === 0) {
//       return res.status(404).json({
//         message: "Keranjang kosong"
//       });
//     }

//     res.status(200).json(dataCart);

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

exports.addCart = async (req, res) => {

  try {
    
    const { id_customer, id_product, total_product } = req.body;

    const dataCart = await Cart.findOne({
      where: { id_customer, id_product }
    });

    const cekProduk = await Product.findOne({
      where: { id: id_product }
    });

    if (!cekProduk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    if (dataCart) {
      if (cekProduk.stock < dataCart.total_produk + total_product) {
        return res.status(400).json({ message: "Stok tidak mencukupi" });
      }

      await dataCart.update({
        total_produk: dataCart.total_produk + total_product
      });

      return res.status(200).json({ message: "Berhasil menambahkan jumlah produk di keranjang" });
      
    } else {

      if (cekProduk.stock < total_product) {
        return res.status(400).json({
          message: "Stok tidak mencukupi"
        });
      }

      await Cart.create({
        id_customer,
        id_product,
        total_produk: total_product
      });

      return res.status(201).json({ message: "Produk berhasil ditambahkan ke keranjang" });
    }
  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server"});
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_product, total_product } = req.body;

    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({
        message: "Keranjang tidak ditemukan"
      });
    }

    const product = await Product.findByPk(id_product);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan"
      });
    }

    if (total_product > product.stock) {
      return res.status(400).json({
        message: "Stok tidak mencukupi"
      });
    }

    await cart.update({
      total_produk: total_product
    });

    res.status(200).json({
      message: "Keranjang berhasil diubah",
      data: cart
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Keranjang tidak ditemukan"
      });
    }

    await cart.destroy();

    res.status(200).json({
      message: "Keranjang berhasil dihapus"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


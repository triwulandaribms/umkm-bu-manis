const Product  = require("../../models/Product");


 exports.getAllProduct = async (_req, res) => {

  try {
    
    const dataProduct = await Product.findAll();

    if(!dataProduct){
      return res.status(404).json({ 
        message: "Produk tidak ditemukan" 
      });
    }

    res.status(200).json({
      data: dataProduct
    });

  } catch (error) {
    console.error("Gagal menampilkan:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }

};

 exports.getProductById = async (req, res) => {

  try {
    
    const { id } = req.params;

    const dataProduct = await Product.findByPk(id);

    if (!dataProduct) {
      return res.status(404).json({ 
        message: "Produk tidak ditemukan" 
      });
    }

    res.status(200).json({
      message: dataProduct    
    });


  } catch (error) {
    console.error("Gagal menampilkan:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

 exports.addProduct = async (req, res) => {

  try {

    const {name, description, price, stock, image} = req.body;

    if(!name || !description || !price || !stock || !image){
      return res.status(404).json({
        message: "data tidak boleh ada yang kosong"
      });
    }

    await Product.create({
      name,
      description,
      price,
      stock,
      image
    });

    res.status(201).json({ 
      message: "Data produk berhasil ditambahkan" 
    });

  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

 exports.updateProduct = async (req, res) => {

  try {

    const { id } = req.params;
    const { name, description, price, stock, image } = req.body;

    if(!name || !description || !price || !stock || !image){
      return res.status(404).json({
        message: "data tidak boleh ada yang kosong"
      }); 
    }

    await Product.update({
      name,
      description,
      price,
      stock,
      image
    }, { where : { id } 
  });

    res.status(201).json({
      message: "berhasil update"
    });
    
  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

 exports.deleteProduct = async (req, res) => {
  
  try {
    const { id } = req.params;

    await Product.findOne({
      where: { id }
    });

    res.status(201).json({
      message: `Data produk dengan id  ${id} sudah terhapus`    
    });

  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};


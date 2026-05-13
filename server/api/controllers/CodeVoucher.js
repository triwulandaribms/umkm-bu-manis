const  CodeVoucher  = require("../models/CodeVoucher.js");

 exports.getCodeVoucher = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await CodeVoucher.findOne({
      where: { id }
    });
    
    res.status(200).json({data: result});

  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server"});
  }
};

 exports.deleteCodeVoucher = async (req, res) => {

  try {

    const { id } = req.params;

    await CodeVoucher.findOne({
      where: { id }
    });

    res.status(201).send("Kode voucher berhasil dihapus.");
  
  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server"});
  }
};

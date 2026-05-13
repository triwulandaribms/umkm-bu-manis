const argon2 = require("argon2");
const  Customer  = require("../../models/Customer.js");
const jwt = require("jsonwebtoken");

exports.registerAccountCustomer = async (req, res) => {

  const { name, password } = req.body;

  try {

    if (!name || !password) {
      return res.status(400).json({
        message: "Field wajib diisi"
      });
    }

    let randomCode;
    let cekCode;

    do {

      randomCode =
        "CS" + Math.floor(1000 + Math.random() * 9000);

      cekCode = await Customer.findOne({
        where: {
          customer_code: randomCode
        }
      });

    } while (cekCode);

    const hash = await argon2.hash(password);

    const resultData = await Customer.create({
      customer_code: randomCode,
      name,
      password: hash,
    });

    res.status(201).json({
      message: "Registrasi akun telah berhasil",
      data: {
        id_customer: resultData.id_customer,
        name: resultData.name,
        customer_code: resultData.customer_code
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.loginAccountCustomer = async (req, res) => {

  const { customer_code, password } = req.body;

  try {

    const resultData = await Customer.findOne({
      where: { customer_code }
    });

    if (!resultData) {
      return res.status(404).json({
        message: "Customer tidak ditemukan"
      });
    }

    const cekPasswordValid = await argon2.verify(
      resultData.password,
      password
    );

    if (!cekPasswordValid) {
      return res.status(401).json({
        message: "Password salah"
      });
    }

    console.log(process.env.SECRET_KEY);

    const token = jwt.sign(
      {
        id: resultData.id,
        customer_code: resultData.customer_code,
        name: resultData.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );


    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Berhasil login",
      token,
    });


  } catch (error) {

    console.log(error);
  
    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  
  }
};

exports.logoutAccountCustomer = async (_req, res) => {

  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.status(200).json({ message: "Logout berhasil" });

};

exports.getAllCustomer = async (_req, res) => {
  try {
    const dataCustomer = await Customer.findAll({
      where: {
        deletedAt: null,
      },
    });

    res.status(200).json(dataCustomer);

  } catch (error) {
    console.error("Gagal menampilkan:", error.message);

    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

 exports.updateAccountCustomer = async (req, res) => {

   try {

    const { name } = req.body;
  
    const cekDataCustomer = await Customer.findOne({
      where:{
        id:req.params.id,
        deletedAt: null
      }
    });

    if(!cekDataCustomer){
      return res.status(404).json({
        message: "Customer tidak ditemukan atau sudah dihapus"
      });
    }

    await cekDataCustomer.update({
      name
    });

    res.status(201).json({
      message: "berhasil update"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

 exports.deleteAccountCustomer = async (req, res) => {

  try {
    
    const { id } = req.query;
    
    if(!id){
      return res.status(400).json({
        message: "ID harus diisi."
      });
    }

    const resultData = await Customer.findOne({
      where:{
        id,
        deletedAt: null
      }
    });

    if(!resultData){
      res.status(201).json({
        message: `data berhasil dihapus`    
      });  
    }

    await resultData.update({
      deletedAt: new Date()
    });

  } catch (error) {
    console.error("Gagal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server"});
  }
};


const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { Op } = require("sequelize");



exports.registerAccountAdmin = async (req, res) => {

  const { name, username, password, role } = req.body;

  try {

  
    if(!name || !username || !password || !role){
      return res.status(400).json({
        message:"Field wajib diisi semua"
      });
    };

    const cekUsername = await User.findOne({
      where: {
        username,
        deletedAt: null
      }
    });
    
    if (cekUsername) {
      return res.status(400).json({
        message: "Username sudah digunakan"
      });
    }

    const cekUser = await User.findAll({
      where: {
        deletedAt: null
      }
    });

    for (const user of cekUser) {

      const cekPasswordSama = await argon2.verify(
        user.password, 
        password
      );

      if (cekPasswordSama) {
        return res.status(400).json({
          message: "Password sudah pernah digunakan oleh user lain"
        });
      }
    }

    const hash = await argon2.hash(password);

    const resultData = await User.create({
      name,
      username,
      password: hash,
      role
    });

    res.status(201).json({
      message: "Pendaftaran akun admin telah berhasil",
      data: {
        id: resultData.id,
        name: resultData.name,
        username: resultData.username,
        role: resultData.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginAccountAdmin = async (req, res) => {

  const { username, password } = req.body;

  try {

    const resultData = await User.findOne({
      where: { 
        username,
        deletedAt: null
      }
    });

    if (!resultData) {
      return res.status(404).json({
        message: "Username tidak ditemukan"
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

    const token = jwt.sign(
      {
        id: resultData.id,
        name: resultData.name,
        username: resultData.username,
        role: resultData.role
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
      message: "Login berhasil",
      token,
    });

  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getCurrentUser = async (req, res) => {

  try {

    const {id, username, role} = req.user;

    return res.status(200).json({
      status: "Berhasil",
      message: `${req.user.username} sedang login`,
      data: {
        id,
        username,
        role
      },
    });

  } catch (error) {
    res.status(500).json({ error: "Belum ada user atau customer yang login" });
  }
};

exports.logoutAccount = async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.status(200).json({ message: "Logout berhasil" });
};

exports.getAllUser = async (_req, res) => {

  try {
    const dataResult = await User.findAll({
      where:{
        deletedAt: null
      }
    });

    if(!dataResult){
      return res.status(404).json({
        message: "Data user tidak ditemukan"
      })
    }
    return res.status(200).json({
      message: "Data user",
      data: dataResult
    })
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

};

exports.updateAccountUser = async (req, res) => {

  const { name, username, role, password } = req.body;

  try {

    const cekDataUser = await User.findOne({
      where: {
        id: req.params.id,
        deletedAt: null
      }
    });

    if (!cekDataUser) {
      return res.status(404).json({
        message: "User tidak ditemukan atau sudah dihapus"
      });
    }

    if (password) {

      const users = await User.findAll({
        where: {
          id: { [Op.ne]: cekDataUser.id },
          deletedAt: null
        }
      });

      for (const u of users) {

        const cekPasswordSama = await argon2.verify(u.password, password);

        if (cekPasswordSama) {
          return res.status(400).json({
            message: "Password sudah pernah digunakan oleh user lain"
          });
        }
      }

      cekDataUser.password = await argon2.hash(password);
    }

    await cekDataUser.update({
      name,
      username,
      password: cekDataUser.password,
      role
    });

    res.status(201).json({
      message: "Data berhasil diubah.",
      data: {
        id: cekDataUser.id,
        name: cekDataUser.name,
        username: cekDataUser.username,
        role: cekDataUser.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteAccountUser = async (req, res) => {

  try {
    
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID harus diisi."
      });
    }

    const resultData = await User.findOne({
      where: {
        id,
        deletedAt: null
      }
    });

    if (!resultData) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    await resultData.update({
      deletedAt: new Date()
    });

    res.status(200).json({
      message: "User berhasil dihapus"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

};




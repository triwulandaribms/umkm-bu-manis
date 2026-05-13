const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const productModel = sequelize.define(
    "product", 
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
  
},
{
    tableName:"product",
    timestamps: true,
}
);


module.exports = productModel;
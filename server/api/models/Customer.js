const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const customerModel = sequelize.define(
    "customer", 
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    customer_code:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    tableName: "customer",
    timestamps: true,
}
);


module.exports = customerModel;
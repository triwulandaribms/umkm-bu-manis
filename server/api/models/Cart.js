const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const cartModel = sequelize.define(
    "cart", 
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    id_customer:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customer',
            key: 'id'
        },
    },
    id_product:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'id'
        },
    },
    total_produk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    tableName:"cart",
    timestamps: true,
}
);



module.exports = cartModel;

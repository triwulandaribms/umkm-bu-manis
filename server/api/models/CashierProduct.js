const { sequelize } = require("../config/db.js");
const { DataTypes } = require( "sequelize");

const cashierProductModel = sequelize.define(
    "cashier_product", 
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    id_product:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',    
            key: 'id'
        },
    },
    total_product:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sub_total:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    tableName:"cashier_product",
    timestamps: true,

}
);


module.exports = cashierProductModel;

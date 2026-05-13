const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const codeVoucherModel = sequelize.define(
    "voucher_code", 
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    id_customer:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'customer',
            key: 'id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },

},
{
    tableName:"voucher_code",
    timestamps: true,
}
);



module.exports = codeVoucherModel;

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true, //Serial
      allowNull: false, //required
      primaryKey: true // is the primary key/id of each entry on this table
    },
    
    product_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"product",
        key: "id"
      }
    },
    tag_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"tag",
        key: "id"
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true, //Serial
      allowNull: false, //required
      primaryKey: true // is the primary key/id of each entry on this table
    },
    category_name:{
      type: DataTypes.STRING,
      allowNull: false,
      
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;

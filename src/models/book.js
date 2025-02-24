'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    original_cost: DataTypes.INTEGER,
    sale: DataTypes.INTEGER, //%
    stock: DataTypes.STOCK,
    publisher_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    state:  DataTypes.STRING, //show/notshow
    published_date: DataTypes.DATE,
    series_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
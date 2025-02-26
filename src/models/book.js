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
    originalCost: DataTypes.INTEGER,
    sale: DataTypes.INTEGER, //%
    stock: DataTypes.INTEGER,
    publisherId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    state:  DataTypes.STRING, //show/notshow
    publishedDate: DataTypes.DATE,
    seriesId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
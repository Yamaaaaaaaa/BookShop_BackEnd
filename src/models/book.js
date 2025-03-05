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
      Book.hasMany(models.Bill_Book, { foreignKey: "bookId" });
      Book.belongsTo(models.Author, { foreignKey: "authorId" });
      Book.belongsTo(models.Publisher, { foreignKey: "publisherId" });
      Book.belongsTo(models.Serie, { foreignKey: "seriesId" });
      Book.hasMany(models.Cart, { foreignKey: "bookId" });
      Book.hasMany(models.WishList, { foreignKey: "bookId" })
      Book.belongsToMany(models.Category, {through: "Book_Category" , foreignKey: "bookId"} )
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
    bookImageUrl: DataTypes.STRING,
    pin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
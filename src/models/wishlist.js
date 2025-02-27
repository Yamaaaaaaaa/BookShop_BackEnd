'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WishList.belongsTo(models.User, { foreignKey: "userId" });
      WishList.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  WishList.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'WishList',
  });
  return WishList;
};
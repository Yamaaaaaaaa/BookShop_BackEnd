'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group)
      User.hasMany(models.Bill, { foreignKey: "userId" })
      User.hasMany(models.Cart, { foreignKey: "userId" });
      User.hasMany(models.WishList, { foreignKey: "userId" });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    groupId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init({
    userId: DataTypes.INTEGER,
    paymentMethodId: DataTypes.INTEGER,
    deliveryAddress: DataTypes.TEXT,
    deliveryPhone: DataTypes.STRING, //%
    totalCost: DataTypes.INTEGER,
    state: DataTypes.STRING, // Trạng thái đơn hàng: pending, approve, shipping, shipped, canceled
    shippingMethod: DataTypes.STRING,
    state:  DataTypes.STRING, //show/notshow
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};
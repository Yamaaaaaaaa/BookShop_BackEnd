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
    user_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER,
    delivery_address: DataTypes.TEXT,
    delivery_phone: DataTypes.STRING, //%
    total_cost: DataTypes.INTEGER,
    state: DataTypes.STRING, // Trạng thái đơn hàng: pending, approve, shipping, shipped, canceled
    shipping_method: DataTypes.STRING,
    state:  DataTypes.STRING, //show/notshow
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};
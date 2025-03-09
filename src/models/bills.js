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
      Bill.belongsToMany(models.Book, {
        through: models.Bill_Book,
        foreignKey: 'billId',
        otherKey: 'bookId'
      });
      Bill.belongsTo(models.User, { foreignKey: "userId" })
      Bill.belongsTo(models.PaymentMethod, { foreignKey: "paymentMethodId" });
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
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};
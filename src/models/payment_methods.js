'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentMethod.hasMany(models.Bill, { foreignKey: "paymentMethodId" });
    }
  }
  PaymentMethod.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    qrUrl: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};
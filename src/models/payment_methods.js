'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment_method.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    original_cost: DataTypes.INTEGER,
    qr_url: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Payment_method',
  });
  return Payment_method;
};
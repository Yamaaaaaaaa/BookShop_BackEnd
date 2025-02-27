'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      paymentMethodId: {
        type: Sequelize.INTEGER
      },
      deliveryAddress: {
        type: Sequelize.TEXT
      },
      deliveryPhone: {
        type: Sequelize.STRING
      },
      totalCost: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      shippingMethod: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bills');
  }
};
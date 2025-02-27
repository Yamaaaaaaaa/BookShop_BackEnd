'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Bills',
        [ 
          { userId: 1, paymentMethodId: 1, deliveryAddress: '123 Đường ABC, TP.HCM', deliveryPhone: '0987654321', totalCost: 270000, state: 'pending', shippingMethod: 'Giao hàng nhanh' },
          { userId: 2, paymentMethodId: 3, deliveryAddress: '456 Đường XYZ, Hà Nội', deliveryPhone: '0912345678', totalCost: 110000, state: 'approved', shippingMethod: 'Giao hàng tiết kiệm' }
        ]
      , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

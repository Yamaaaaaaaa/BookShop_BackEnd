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
          { userId: 2, paymentMethodId: 3, deliveryAddress: '456 Đường XYZ, Hà Nội', deliveryPhone: '0912345678', totalCost: 110000, state: 'approved', shippingMethod: 'Giao hàng tiết kiệm' },
          { userId: 3, paymentMethodId: 2, deliveryAddress: '789 Đường LMN, Đà Nẵng', deliveryPhone: '0934567890', totalCost: 40000, state: 'shipped', shippingMethod: 'Giao hàng nhanh' },
          { userId: 4, paymentMethodId: 1, deliveryAddress: '101 Đường UVW, Cần Thơ', deliveryPhone: '0945678901', totalCost: 80000, state: 'delivered', shippingMethod: 'Giao hàng tiết kiệm' }
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

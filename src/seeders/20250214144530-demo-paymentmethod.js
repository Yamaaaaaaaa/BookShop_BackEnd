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
      await queryInterface.bulkInsert('PaymentMethods',
        [ 
          { name: 'Ví Momo', description: 'Thanh toán qua Momo', qrUrl: 'https://momo.vn/qr' },
          { name: 'Chuyển khoản ngân hàng', description: 'Thanh toán qua ngân hàng', qrUrl: '' },
          { name: 'Thanh toán khi nhận hàng', description: 'COD', qrUrl: '' }       
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

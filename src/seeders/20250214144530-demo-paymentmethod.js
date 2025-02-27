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
          { name: 'Chuyển khoản ngân hàng', description: 'Thanh toán qua ngân hàng', qrUrl: 'https://th.bing.com/th/id/R.c49b5d67e46b68c57e23ff47c033ea81?rik=mLdnD2WylTRcrA&pid=ImgRaw&r=0' },
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

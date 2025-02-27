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
      await queryInterface.bulkInsert('Series',
        [ 
          { name: 'Harry Potter', description: 'Bộ tiểu thuyết kỳ ảo về cậu bé phù thủy.'},
          { name: 'Kính Vạn Hoa', description: 'Bộ truyện dành cho thiếu nhi của Nguyễn Nhật Ánh.'},
          { name: 'Thám tử lừng danh Conan', description: 'Bộ truyện trinh thám nổi tiếng của Nhật Bản.'}
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

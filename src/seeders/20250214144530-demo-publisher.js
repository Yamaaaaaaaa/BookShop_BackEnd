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
      await queryInterface.bulkInsert('Publishers',
        [ 
          { name: 'NXB Trẻ', description: 'Nhà xuất bản sách thiếu nhi nổi tiếng Việt Nam.' },
          { name: 'NXB Kim Đồng', description: 'Chuyên xuất bản sách truyện tranh và thiếu nhi.' },
          { name: 'Bloomsbury', description: 'Nhà xuất bản chính của bộ truyện Harry Potter.' },
          { name: 'Shogakukan', description: 'Nhà xuất bản của bộ truyện Conan tại Nhật Bản.' }
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

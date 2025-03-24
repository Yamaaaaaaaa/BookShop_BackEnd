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
      await queryInterface.bulkInsert('Authors',
        [ 
          { name: 'Nguyễn Nhật Ánh', description: 'Nhà văn nổi tiếng với các tác phẩm dành cho tuổi thơ.', authorImage: "" },
          { name: 'J.K. Rowling', description: 'Tác giả của loạt truyện Harry Potter.', authorImage: "" },
          { name: 'Haruki Murakami', description: 'Nhà văn Nhật Bản nổi tiếng với phong cách kỳ ảo.', authorImage: "" },
          { name: 'Gosho Aoyama', description: 'Tác giả của bộ truyện trinh thám Thám tử lừng danh Conan.', authorImage: ""}
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

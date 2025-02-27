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
      await queryInterface.bulkInsert('Categorys',
        [ 
          { name: 'Tiểu thuyết', description: 'Các tác phẩm văn học hư cấu.' },
          { name: 'Thiếu nhi', description: 'Sách dành cho trẻ em.' },
          { name: 'Khoa học viễn tưởng', description: 'Sách về chủ đề tương lai, công nghệ, khoa học.' },
          { name: 'Trinh thám', description: 'Sách về các vụ án bí ẩn và điều tra.' }
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

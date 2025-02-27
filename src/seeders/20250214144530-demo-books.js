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
      await queryInterface.bulkInsert('Books',
        [ 
          { name: 'Harry Potter và Hòn Đá Phù Thủy', description: 'Cuốn sách đầu tiên trong loạt Harry Potter.', originalCost: 150000, sale: 135000, stock: 50, publisherId: 3, authorId: 2, publishedDate: '1997-06-26', state: 'new', seriesId: 1 },
          { name: 'Conan Tập 1', description: 'Tập đầu tiên của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 100, publisherId: 4, authorId: 4, publishedDate: '1994-01-01', state: 'new', seriesId: 3 },
          { name: 'Conan Tập 2', description: 'Tập thứ hai của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 90, publisherId: 4, authorId: 4, publishedDate: '1994-06-01', state: 'new', seriesId: 3 },
          { name: 'Mắt Biếc', description: 'Một tác phẩm nổi tiếng của Nguyễn Nhật Ánh.', originalCost: 120000, sale: 110000, stock: 40, publisherId: 1, authorId: 1, publishedDate: '1990-01-01', state: 'new', seriesId: null },
          { name: 'Rừng Na Uy', description: 'Tiểu thuyết nổi tiếng của Haruki Murakami.', originalCost: 180000, sale: 160000, stock: 30, publisherId: 2, authorId: 3, publishedDate: '1987-01-01', state: 'new', seriesId: null }  
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

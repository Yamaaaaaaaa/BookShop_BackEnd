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
      await queryInterface.bulkInsert('Book_Categories',
        [ 
          { bookId: 1, categoryId: 2 },
          { bookId: 1, categoryId: 3 },
          { bookId: 2, categoryId: 2 },
          { bookId: 2, categoryId: 3 },
          { bookId: 3, categoryId: 2 },
          { bookId: 3, categoryId: 3 },
          { bookId: 4, categoryId: 2 },
          { bookId: 4, categoryId: 3 },
          { bookId: 5, categoryId: 4 },
          { bookId: 6, categoryId: 4 },
          { bookId: 7, categoryId: 4 },
          { bookId: 8, categoryId: 4 },
          { bookId: 9, categoryId: 4 },
          { bookId: 10, categoryId: 4 },
          { bookId: 11, categoryId: 4 },
          { bookId: 12, categoryId: 4 },
          { bookId: 13, categoryId: 4 },
          { bookId: 14, categoryId: 4 },
          { bookId: 15, categoryId: 1 },
          { bookId: 16, categoryId: 1 },
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

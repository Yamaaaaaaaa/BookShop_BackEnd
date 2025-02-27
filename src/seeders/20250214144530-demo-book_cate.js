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
      await queryInterface.bulkInsert('Book_Categorys',
        [ 
          { bookId: 1, categoryId: 3 },
          { bookId: 2, categoryId: 4 },
          { bookId: 3, categoryId: 4 },
          { bookId: 4, categoryId: 1 },
          { bookId: 5, categoryId: 1 }  
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

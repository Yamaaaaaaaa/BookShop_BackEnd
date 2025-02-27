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
      await queryInterface.bulkInsert('Carts',
        [ 
          { userId: 1, bookId: 1, quantity: 2},
          { userId: 2, bookId: 4, quantity: 1},
          { userId: 3, bookId: 5, quantity: 3},
          { userId: 4, bookId: 3, quantity: 1 },
          { userId: 5, bookId: 7, quantity: 2 },
          { userId: 6, bookId: 10, quantity: 1 }  
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

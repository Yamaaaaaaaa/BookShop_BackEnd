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
      await queryInterface.bulkInsert('Users', 
        [ 
          { // User: tên Model chứ ko phải tên Class (class là ko có 's' ở cuối)
            firstName: 'John Doe',
            lastName: "12341234",
            email: "fake 1@ex.com"
          },
          { // User: tên Model chứ ko phải tên Class (class là ko có 's' ở cuối)
            firstName: 'John Doe 2 ',
            lastName: "12341234",
            email: "fake 2@ex.com"
          },
          { 
            firstName: 'John Doe 3',
            lastName: "12341234",
            email: "fake3@ex.com"
          },
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

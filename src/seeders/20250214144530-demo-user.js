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
      await queryInterface.bulkInsert('Users',  // Users phải có s ở cuối
        [ 
          { // User: tên Model chứ ko phải tên Class (class là ko có 's' ở cuối)
            name: 'son1',
            email: "son1@gmail.com",
            password: "1",
            phone: "1",
            address: "1",
            status: "enable",
            groupId: 1
          },
          { // User: tên Model chứ ko phải tên Class (class là ko có 's' ở cuối)
            name: 'son2',
            email: "son2@gmail.com",
            password: "2",
            phone: "2",
            address: "2",
            status: "enable",
            groupId: 1
          },
          { // User: tên Model chứ ko phải tên Class (class là ko có 's' ở cuối)
            name: 'son3',
            email: "son3@gmail.com",
            password: "3",
            phone: "3",
            address: "3",
            status: "enable",
            groupId: 1
          },
          { // User: tên Model chứ ko phải tên Class (class là ko có 's' ở cuối)
            name: 'son4',
            email: "son4@gmail.com",
            password: "4",
            phone: "4",
            address: "4",
            status: "enable",
            groupId: 1
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

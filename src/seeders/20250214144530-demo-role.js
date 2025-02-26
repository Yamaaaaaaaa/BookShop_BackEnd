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
      await queryInterface.bulkInsert('Roles',
        [ 
          { 
            name: 'create user',
            description: "Can Create New User",
            url: "/auth/create-user"
          },
          { 
            name: 'update user',
            description: "Can Update User",
            url: "/auth/update-user"
          },
          { 
            name: 'get user',
            description: "Can Get User",
            url: "/auth/get-user"
          },
          { 
            name: 'delete user',
            description: "Can Delete User",
            url: "/auth/delete-user"
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

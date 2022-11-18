'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rudi_users', [
      {
        username: 'mattsummers',
        password: 'Ilovecoding123!',
        role: 'student',
        code: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'fionaeckert',
        password: 'Ilovecoding123!',
        role: 'student',
        code: '4321',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'jordanboardman',
        password: 'Ilovecoding123!',
        role: 'student',
        code: '6789',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
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

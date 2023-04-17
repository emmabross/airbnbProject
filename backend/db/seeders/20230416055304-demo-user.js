'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Fake',
        lastName: 'Jessie',
        email: 'fakejessie@user.io',
        username: 'FakeJessie',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Fake',
        lastName: 'Goose',
        email: 'fakegoose@user.io',
        username: 'FakeGoose',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Fake',
        lastName: 'Harley',
        email: 'fakeharley@user.io',
        username: 'FakeHarley',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['FakeJessie', 'FakeGoose', 'FakeHarley'] }
    }, {});
  }
};

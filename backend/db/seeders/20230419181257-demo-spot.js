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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'New York',
        state: 'New York',
        country: 'United States of America',
        lat: 37.7656358,
        lng: -122.4730328,
        name: 'Beach House',
        description: 'Stunning Stunning Stunning Stunning Stunning ',
        price: 12.03
      },
      {
        ownerId: 2,
        address: 'Empty',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7656458,
        lng: -122.4730325,
        name: 'Cabin in the Woods',
        description: 'Stink Stink Stink Stink Stink Stink Stink ',
        price: 12.03
      },
      {
        ownerId: 3,
        address: '456 Broadway',
        city: 'Kansas City',
        state: 'Missouri',
        country: 'United States of America',
        lat: 37.7656658,
        lng: -122.4730323,
        name: 'Stinky Linktropolis',
        description: 'Tootie Tootie Tootie Tootie Tootie Tootie Tootie',
        price: 10.23
      },
      {
        ownerId: 2,
        address: '789 Hollywood Blvd',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States of America',
        lat: 37.7656651,
        lng: -142.4730327,
        name: 'Hot Girl Summer Villa',
        description: 'I love Goose I love Goose I love Goose I love Goose I love Goose',
        price: 13.02
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
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options)
  }
};

'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
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
        description: 'I love Goose Goose I love Goose',
        price: 13.02
      },
      {
        ownerId: 3,
        address: '1234 Ocean Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7304201,
        lng: -122.4767739,
        name: 'Beachside Bungalow',
        description: 'Relax and unwind in this cozy beachside bungalow, just steps from the sand.',
        price: 143.99
      },
      {
        ownerId: 4,
        address: '5678 Market St',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7750129,
        lng: -122.4336522,
        name: 'Urban Oasis',
        description: 'Escape the hustle and bustle of the city in this tranquil urban oasis, complete with a private garden.',
        price: 139.99
      },
      {
        ownerId: 1,
        address: '9012 Valencia St',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7501141,
        lng: -122.4200639,
        name: 'Spanish Villa',
        description: 'Experience the charm of old-world Spain in this stunning villa, complete with a courtyard and rooftop terrace.',
        price: 129.99
      },
      {
        ownerId: 5,
        address: '7890 Haight St',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7682355,
        lng: -122.4538625,
        name: 'Hipster Haven',
        description: 'Stay in the heart of the citys trendiest neighborhood in this chic and stylish loft.',
        price: 152.99
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Beach House', 'Cabin in the Woods', 'Stinky Linktropolis', 'Hot Girl Summer Villa', 'Beachside Bungalow', 'Urban Oasis', 'Spanish Villa', 'Hipster Haven'] }
    }, {});
  }
};

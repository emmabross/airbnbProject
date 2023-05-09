'use strict';

// const { query } = require('express');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531294206673018/58B8F96E-481B-45C4-9992-AD801C0D001A_1_105_c.jpeg'
      },
      {
        reviewId: 2,
        url: 'https://i.pinimg.com/564x/a6/19/da/a619dadb9d1bc39e6d1337993abba845.jpg'
      },
      {
        reviewId: 3,
        url: 'https://i.pinimg.com/736x/ec/37/55/ec3755ca6a9e91aba1a160ebc735691a.jpg'
      },
      {
        reviewId: 4,
        url: 'https://i.pinimg.com/736x/49/a6/9f/49a69f9fff0e8515789bb172e3daff23.jpg'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options);
  }
};

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: 'Very iconic',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Gorgina',
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        review: 'INCREDIBLE',
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Reviews';
   const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Very iconic', 'Gorgina', 'INCREDIBLE'] }
    }, {});
  }
};

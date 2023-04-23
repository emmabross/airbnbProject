'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Bookings'
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      startDate: new Date('2023-09-12'),
       endDate: new Date('2023-09-15')
    },
     {
       spotId: 2,
       userId: 3,
       startDate: new Date('2023-10-14'),
       endDate: new Date('2023-10-15')
    },
     {
       spotId: 3,
       userId: 2,
       startDate: new Date('2023-11-12'),
       endDate: new Date('2023-11-15')
    },
     {
       spotId: 4,
       userId: 2,
       startDate: new Date('2023-12-14'),
       endDate: new Date('2023-12-24')
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options);
  }
};

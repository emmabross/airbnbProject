'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://www.digitalmomblog.com/wp-content/uploads/2021/09/why-are-you-so-obsessed-with-me-meme.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.chzbgr.com/full/9721968384/h160FB35C/person-my-skincare-products-every-night-girls-keep-so-young-love-so-much',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/expo.advance.net/img/cad38e9263/width2048/202_legallyblondeh2016.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://dazedprod.blob.core.windows.net/dazed-prod/1250/5/1255623.gif',
        preview: true
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options);
  }
};

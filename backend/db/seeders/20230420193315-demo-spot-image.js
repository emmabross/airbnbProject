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
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533279752421466/EA75516F-E97F-4374-B688-3EE6ECEB8320_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533267618308147/E1AB8772-8888-458E-9FA5-DF958A74CB58_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533236110700718/76C54B4A-16D6-4F03-BACD-074E36A5D13A_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533212173803590/3B85410C-EB7C-486B-A209-9857A12BCA8D_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105530493849571529/F7B15F62-5296-415B-A06B-C62A62E08E6B_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533189088366622/94B6C858-AF8E-4BA4-8607-FF16EFB9F065_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533157681401896/0C701D07-7033-4BAD-B9F5-B457E1D53560_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533001598783539/A04F435F-E3D5-414E-BE1D-49CCBBCF5DF6_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532986176319580/66A166EE-34FC-4648-B74B-30BE2F09BDF8_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/expo.advance.net/img/cad38e9263/width2048/202_legallyblondeh2016.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532911530283159/E35D3C2B-8B0D-4EE4-8D7B-B350D988E7D5_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532874876272802/3691886E-E6C3-4C47-BE08-EEF32E5F6E33_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532813559746620/961B6657-DB6D-4FFF-A443-E0DB774ED78D_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532793791987752/87CD0B18-41AE-4931-BD71-A2C24370A696_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105533335981269062/1D6F0F3F-27D2-4A31-A684-F280CE92AC76_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532793791987752/87CD0B18-41AE-4931-BD71-A2C24370A696_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532747335868467/F44ECE10-4726-4EFA-AEA3-4940A7C9B8E0_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532650262900796/7D475B96-CBD9-4545-8F87-703F21C4415C_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532384897671248/FBE28E82-54C6-42DC-BFB0-91163F3719AC_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532371752734811/0D3C288E-999E-48FB-AB47-EF036462C9C1_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532315708440596/ED3827D1-7E02-4240-B4CD-DADCBBEDDAE5_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532238726189186/EF82D76D-6A68-47DC-A978-B170D041BDE3_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532212604063944/3A0EBAFC-3E8D-4278-9ED4-6286650EB180_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532060669579294/EB152EC2-DF56-4B4B-AB5A-39B4B146CC83_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532134745186376/465D1958-5E00-4C3D-86EB-068A937F63D9_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105532122191646821/54569502-02CA-42BC-8957-DBAD5A3BAB46_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531992713482370/A8B3FC53-A596-45A8-8DFA-4527678AAC51_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531981070086214/E50F9FE0-CB59-431B-A12D-8CDA2962E47C_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531948144799794/881F99E4-D8A1-494B-8922-333C45036482_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531922148495360/0DDA2AA7-C3DB-42F3-8E5F-4DE6CD1B7855_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531792565469295/85D6209F-470A-4C52-832B-EF60ABC9BFFA_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531751490650243/79740CA5-7ED0-427C-B0EE-40019DDC4689_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531736013684826/A6662A30-685A-4C3C-9CC0-C640AFA882EF_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531713796440155/FD92DB98-6A89-43B0-8C17-030236473D70_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531908852551680/26C7477C-F1A7-4567-AD3E-C88F9B37F378_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531701460996217/FD1A3530-CD3D-4341-B3C0-DDCC971D6713_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531689918283898/3F6005E4-B907-4D04-934A-94D096FBB1DF_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531652081467463/BA31EAB1-42FD-4532-B1DA-A92949D1BE5C_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531639674699828/19F14573-3067-41D6-BAF6-BE3172EAF211_1_105_c.jpeg',
        preview: false
      }, 
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531887524520027/8183491A-4BAE-4CDB-9D72-CBA8179020C8_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531621962166332/8DDAA431-885C-4AED-9F33-D6E57A594466_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531598570528789/EBE62C43-7BE6-409C-9460-9300C23A0582_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531586734211102/BE280361-B666-4797-9F2E-17D16E03E917_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531570003120149/BE799F16-13F4-428A-85B8-46F59F5C706F_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531851415756852/F3FD690A-1989-49C9-9AA9-38C548C533D0_1_105_c.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531514944487454/9AFABF0E-B443-436A-B418-24526763662A_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531473282486372/6035E19F-CFF7-48E8-9B1E-8CC935303D32_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531428504088606/980EFAD5-3D46-4A6A-B0B2-C0BFBC6FE74F_1_105_c.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1105529560587583628/1105531362116653159/344BBF95-8359-46B1-A733-35D3A96DC098_1_105_c.jpeg',
        preview: false
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
   
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options);
  }
};

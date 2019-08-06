module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert('Users', [
        {
          userId: 'afb4ccb1-0a0f-4e6a-9385-3f02cccfbddb',
          firstName: 'olisa',
          lastName: 'emodi',
          password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
          email: 'olisa@gmail.com',
          role: 'staff',
          isAdmin: false,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          userId: 'abc3302e-0e00-45c7-b960-0e09a7ed3704',
          firstName: 'james',
          lastName: 'udoh',
          password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
          email: 'udoh@gmail.com',
          role: 'client',
          isAdmin: false,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          userId: 'a9c53e8c-88b9-4934-bf2d-d6816aeb3894',
          firstName: 'nneka',
          lastName: 'oguah',
          password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
          email: 'nneka@gmail.com',
          role: 'client',
          isAdmin: false,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          userId: 'bd31220c-8650-45aa-89af-3f3e0829f69a',
          firstName: 'amaka',
          lastName: 'emodi',
          password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
          email: 'amy@gmail.com',
          role: 'staff',
          isAdmin: true,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        }
      ], {});
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      queryInterface.bulkDelete('Users', null, {});
    } catch (error) {
      console.log(error);
    }
  }
};

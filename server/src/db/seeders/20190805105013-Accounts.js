module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert('Accounts', [
        {
          accountId: '34ce2a11-4e6b-47e0-94a0-a8de47a34721',
          accountNumber: 1234567890,
          ownerId: 'abc3302e-0e00-45c7-b960-0e09a7ed3704',
          type: 'current',
          status: 'active',
          balance: 8456372.00,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          accountId: '1c3cff27-492e-4b3b-8471-d084baf2e551',
          accountNumber: 9089058743,
          ownerId: 'a9c53e8c-88b9-4934-bf2d-d6816aeb3894',
          type: 'savings',
          status: 'active',
          balance: 8456372.00,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          accountId: 'b7ea3f5e-49e9-4bd2-ab73-d5d7b3e38e8f',
          accountNumber: 3432567892,
          ownerId: 'a9c53e8c-88b9-4934-bf2d-d6816aeb3894',
          type: 'current',
          status: 'dormant',
          balance: 8456372.00,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          accountId: 'ec2749df-da2c-4bf6-8f71-be3a9426ccf7',
          accountNumber: 9876543211,
          ownerId: 'abc3302e-0e00-45c7-b960-0e09a7ed3704',
          type: 'savings',
          status: 'active',
          balance: 8456372.00,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        }
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      queryInterface.bulkDelete('Accounts', null, {});
    } catch (error) {
      console.log(error);
    }
  }
};

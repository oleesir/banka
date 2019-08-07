module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert('Transactions', [
        {
          transactionId: 'dd7ef4e4-5733-4c7a-b5a4-692cf6f94342',
          accountNumber: 1234567890,
          ownerId: 'abc3302e-0e00-45c7-b960-0e09a7ed3704',
          cashierId: 'afb4ccb1-0a0f-4e6a-9385-3f02cccfbddb',
          type: 'debit',
          amount: 10000.00,
          oldBalance: 30000.00,
          newBalance: 20000.00,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          transactionId: '518390f3-d7e5-480c-aafc-76a3826dff0b',
          accountNumber: 9089058743,
          ownerId: 'a9c53e8c-88b9-4934-bf2d-d6816aeb3894',
          cashierId: 'afb4ccb1-0a0f-4e6a-9385-3f02cccfbddb',
          type: 'credit',
          amount: 10000.00,
          oldBalance: 30000.00,
          newBalance: 40000.00,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
        {
          transactionId: 'd92f0c70-70a5-4725-b6c1-0d92fc4467e6',
          accountNumber: 9876543211,
          ownerId: 'abc3302e-0e00-45c7-b960-0e09a7ed3704',
          cashierId: 'afb4ccb1-0a0f-4e6a-9385-3f02cccfbddb',
          type: 'debit',
          amount: 10000.00,
          oldBalance: 30000.00,
          newBalance: 20000.00,
          createdAt: '2018-05-06T00:47:03.687Z',
          updatedAt: '2018-05-06T00:47:03.687Z'
        },
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

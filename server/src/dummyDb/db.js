export default {
  users: [
    {
      id: 1,
      email: 'amaka@gmail.com',
      firstName: 'Amaka',
      lastName: 'Emodi',
      password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
      role: 'staff',
      isAdmin: true
    },
    {
      id: 2,
      email: 'olisa@gmail.com',
      firstName: 'Olisa',
      lastName: 'Emodi',
      password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
      role: 'staff',
      isAdmin: false
    },
    {
      id: 3,
      email: 'ivy@gmail.com',
      firstName: 'Iveren',
      lastName: 'Shaguy',
      password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
      role: 'client',
      isAdmin: false
    },
    {
      id: 4,
      email: 'nne@gmail.com',
      firstName: 'Nneka',
      lastName: 'Oguah',
      password: '$2b$10$cI8umn6Pm692nWb.mOHYS.wPvUo0KMdsiIsS1TMoIoQnAhrZHb8ta',
      role: 'client',
      isAdmin: false
    },
  ],

  accounts: [
    {
      id: 1,
      accountNumber: 3452783652,
      createdOn: 'Thursday, May 30, 2019 5:11 PM',
      owner: 4,
      type: 'current',
      status: 'active',
      balance: 8576453.00
    },
    {
      id: 2,
      accountNumber: 9870654673,
      createdOn: 'Thursday, May 30, 2019 5:11 PM',
      owner: 3,
      type: 'savings',
      status: 'dormant',
      balance: 2364756.00
    }
  ],
  transactions: [
    {
      id: 1,
      createdOn: 'Thursday, May 30, 2019 5:11 PM',
      transactypeType: 'credit',
      accountNumber: 9987456386,
      cashier: 2,
      amount: 2000.00,
      oldBalance: 4000.00,
      newBalance: 6000.00
    },
    {
      id: 2,
      createdOn: 'Thursday, May 30, 2019 5:11 PM',
      transactypeType: 'debit',
      accountNumber: 1123986435,
      cashier: 3,
      amount: 6000.00,
      oldBalance: 10000.00,
      newBalance: 4000.00
    },
    {
      id: 3,
      createdOn: 'Thursday, May 30, 2019 5:11 PM',
      transactypeType: 'credit',
      accountNumber: 7658934562,
      cashier: 1,
      amount: 10000.00,
      oldBalance: 25000.00,
      newBalance: 35000.00
    }

  ]
};

export default {
  users: [
    {
      id: 1,
      email: 'olisa@gmail.com',
      firstName: 'Olisa',
      lastName: 'Emodi',
      password: 'secret',
      role: 'client',
      isAdmin: 0
    },
    {
      id: 2,
      email: 'amaka@gmail.com',
      firstName: 'Amaka',
      lastName: 'Emodi',
      password: 'secret',
      role: 'staff',
      isAdmin: 1
    },
    {
      id: 3,
      email: 'ivy@gmail.com',
      firstName: 'Iveren',
      lastName: 'Shaguy',
      password: 'secret',
      role: 'client',
      isAdmin: 0
    },
  ],

  accounts: [
    {
      id: 1,
      accountNumber: 3452783652,
      createdOn: 'Thursday, May 30, 2019 5:11 PM',
      owner: 2,
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
  ]

};

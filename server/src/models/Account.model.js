import moment from 'moment';
import dummyData from '../dummyDb/db';
import formatAmount from '../helpers/formatAmount';
import generateNumber from '../helpers/generateNumbers';

const { accounts } = dummyData;

/**
 * @Account
 */
export default class Account {
  /**
   * @constructor
   *
   * @param {object} account
   */
  constructor(account) {
    const { userId, type } = account;
    const accountsLength = accounts.length;
    const lastId = accounts[accountsLength - 1].id;

    const newId = lastId + 1;
    const newAccount = {
      id: newId,
      accountNumber: generateNumber(),
      owner: userId,
      createdOn: moment().format(),
      type,
      status: 'dormant',
      balance: formatAmount(0.00),
    };

    accounts.push(newAccount);

    return newAccount;
  }
}

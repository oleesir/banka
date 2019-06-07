import moment from 'moment';
import dummyData from '../dummyDb/db';
import Account from '../models/Account.model';
import generateNumber from '../helpers/generateNumbers';

const { accounts } = dummyData;

/**
 * @class AccountController
 */
export default class AccountController {
  /**
   * @method createAccount
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {object} status code and data message
   */
  static createAccount(req, res) {
    const { type } = req.body;
    const {
      id, firstName, lastName, email, role
    } = req.decoded;

    if (role !== 'client') {
      return res.status(401).json({
        status: 401,
        error: 'Only clients can create accounts'
      });
    }
    const newAccount = new Account();
    const accountsLength = accounts.length;
    const lastId = accounts[accountsLength - 1].id;
    const newId = lastId + 1;
    newAccount.id = newId;
    newAccount.accountNumber = generateNumber();
    newAccount.owner = id;
    newAccount.createdAt = moment().format('LLLL');
    newAccount.type = type;
    newAccount.status = 'Dormant';
    newAccount.balance = Number.parseFloat(0.00).toFixed(2);

    accounts.push(newAccount);

    const data = {
      id,
      accountNumber: newAccount.accountNumber,
      firstName,
      lastName,
      email,
      type: newAccount.type,
      openingBalance: newAccount.balance
    };

    return res.status(201).json({
      status: 201,
      data,
      message: 'Account created'
    });
  }
}

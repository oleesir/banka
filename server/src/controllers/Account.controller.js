import moment from 'moment';
import dummyData from '../dummyDb/db';
import Account from '../models/Account.model';

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
      id, firstName, lastName, email
    } = req.decoded;
    if (req.decoded.type === 'client') {
      const newAccount = new Account();
      const accountsLength = accounts.length;
      const lastId = accounts[accountsLength - 1];
      const newId = lastId + 1;
      newAccount.id = newId;
      newAccount.accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
      newAccount.owner = id;
      newAccount.createdAt = moment().format('LLLL');
      newAccount.type = type;
      newAccount.status = 'Active';
      newAccount.balance = 0.0;

      accounts.push(newAccount);

      const data = {
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

    return res.status(401).json({
      status: 401,
      error: 'Only clients can create accounts'
    });
  }
}

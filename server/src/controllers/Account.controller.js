import moment from 'moment';
import dummyData from '../dummyDb/db';
import Account from '../models/Account.model';
import generateNumber from '../helpers/generateNumbers';
import isEmpty from '../helpers/isEmpty';

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
    newAccount.createdOn = moment().format();
    newAccount.type = type;
    newAccount.status = 'dormant';
    newAccount.balance = parseFloat(0.00.toFixed(2));

    accounts.push(newAccount);
    const data = {
      id: newAccount.id,
      accountNumber: newAccount.accountNumber,
      firstName,
      lastName,
      owner: newAccount.owner,
      email,
      type: newAccount.type,
      status: 'dormant',
      openingBalance: newAccount.balance
    };

    return res.status(201).json({
      status: 201,
      data,
      message: 'Account created'
    });
  }

  /**
 * @method getAccount
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @returns {object} status code and data message
 */
  static getAccount(req, res) {
    const { accountNumber } = req.params;
    const {
      id: userId, role
    } = req.decoded;
    let retriveAccount;

    if (role === 'client') {
      retriveAccount = accounts
        .find(account => (
          account.accountNumber === parseInt(accountNumber, 10)
          && userId === account.owner
        ));
    } else {
      // staff or admin can get any account
      retriveAccount = accounts
        .find(account => account.accountNumber === parseInt(accountNumber, 10));
    }


    if (isEmpty(retriveAccount)) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist'
      });
    }

    const {
      id, balance, owner, status, type, accountNumber: userAccountNumber
    } = retriveAccount;

    const data = {
      id, accountNumber: userAccountNumber, owner, type, status, balance
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }
}

import dummyData from '../dummyDb/db';
import Account from '../models/Account.model';
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
      id: userId, firstName, lastName, email
    } = req.decoded;

    const {
      id, accountNumber, owner, balance, status
    } = new Account({ userId, type });

    const data = {
      id,
      accountNumber,
      firstName,
      lastName,
      owner,
      email,
      type,
      status,
      openingBalance: balance
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

  /**
   *@method editAccount
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} returns status error and message properties
   */
  static editAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    const accountToEdit = accounts
      .find(account => account.accountNumber === parseInt(accountNumber, 10));

    if (!accountToEdit) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist'
      });
    }

    const { status: checkStatus, accountNumber: userAccountNumber } = accountToEdit;
    if (checkStatus === status) {
      return res.status(409).json({
        status: 409,
        error: `Account is already ${status}`
      });
    }

    accountToEdit.status = status;

    const data = {
      accountNumber: userAccountNumber,
      owner: accountToEdit.owner,
      status: accountToEdit.status
    };

    return res.status(200).json({
      status: 200,
      data,
      message: 'Account updated successfully'
    });
  }

  /**
   *@method deleteAccount
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} returns status error and message properties
   */
  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const accountToDelete = accounts
      .findIndex(account => account.accountNumber === parseInt(accountNumber, 10));

    if (accountToDelete === -1) {
      return res.status(400).json({
        status: 400,
        error: 'Account does not exist'
      });
    }

    accounts.splice(accountToDelete, 1);

    return res.status(200).json({
      status: 200,
      message: 'Account deleted successfully'
    });
  }
}

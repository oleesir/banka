import Model from '../db/index';
import isEmpty from '../helpers/isEmpty';
import generateNumber from '../helpers/generateNumbers';
import formatAmount from '../helpers/formatAmount';


const accounts = new Model('accounts');


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
  static async createAccount(req, res) {
    const { type } = req.body;
    const {
      id: userId, firstName, lastName, email, role,
    } = req.decoded;

    if (role === 'client') {
      const accountNumber = await generateNumber();
      const [newAccount] = await accounts.create(['account_number', 'owner_id', 'owner_name', 'owner_email', 'type', 'status', 'balance'],
        [`'${accountNumber}','${userId}','${firstName} ${lastName}','${email}','${type}','dormant',0.0`]);


      const data = {
        id: newAccount.id,
        ownerId: newAccount.ownerId,
        accountNumber: newAccount.accountNumber,
        ownerName: newAccount.ownerName,
        ownerEmail: newAccount.ownerEmail,
        type: newAccount.type,
        status: newAccount.status,
        balance: formatAmount(newAccount.balance)

      };
      return res.status(201).json({
        status: 201,
        data,
        message: 'Account created'
      });
    }
  }

  /**
 * @method getAccount
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @returns {object} status code and data message
 */
  static async getAccount(req, res) {
    const { accountNumber } = req.params;
    const {
      id: userId, role
    } = req.decoded;
    let retriveAccount;

    if (role === 'client') {
      [retriveAccount] = await accounts.select(['*'],
        [`account_number=${parseInt(accountNumber, 10)}
         AND owner_id=${userId}`]);
    } else {
      // staff or admin can get any account
      [retriveAccount] = await accounts.select(['*'],
        [`account_number=${parseInt(accountNumber, 10)}`]);
    }


    if (!retriveAccount) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exists'
      });
    }

    const {
      id, balance, ownerId, status, type, accountNumber: userAccountNumber
    } = retriveAccount;


    const data = {
      id, accountNumber: userAccountNumber, ownerId, type, status, balance
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }

  /**
   * @method getAllAccounts
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code and data message
   */
  static async getAllAccounts(req, res) {
    const { status } = req.query;
    const { role, id: userId } = req.decoded;

    if (role === 'staff') {
      if (isEmpty(req.query)) {
        const allAccounts = await accounts.selectAll(['*']);
        return res.status(200).json({
          status: 200,
          data: allAccounts
        });
      }

      const activeAccounts = await accounts.select(['*'], [`status='${status}'`]);
      return res.status(200).json({
        status: 200,
        data: activeAccounts
      });
    }

    const userAccounts = await accounts.select(['*'], [`owner_id='${userId}'`]);
    return res.status(200).json({
      status: 200,
      data: userAccounts
    });
  }

  /**
   * @method editAccount
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} returns status error and message properties
   */
  static async editAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;
    const { role } = req.decoded;
    if (role === 'client') {
      return res.status(401).json({
        status: 401,
        error: 'You are not authorized to perform this action'
      });
    }
    const [accountToEdit] = await accounts.select(['*'],
      [`account_number=${parseInt(accountNumber, 10)}`]);

    if (!accountToEdit) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist'
      });
    }

    const { status: checkStatus, accountNumber: userAccountNumber } = accountToEdit;
    if (checkStatus === status) {
      return res.status(400).json({
        status: 400,
        error: `Account is already ${status}`
      });
    }

    const [accountUpdated] = await accounts.update([`status='${status}'`], [`account_number='${parseInt(userAccountNumber, 10)}'`]);

    const data = {
      accountNumber: accountUpdated.accountNumber,
      ownerId: accountUpdated.owner_id,
      status: accountUpdated.status
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
  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const [accountToDelete] = await accounts.select(['*'],
      [`account_number=${parseInt(accountNumber, 10)}`]);

    if (!accountToDelete) {
      return res.status(400).json({
        status: 400,
        error: 'Account does not exist'
      });
    }


    await accounts.delete([`account_number='${accountToDelete.accountNumber}'`]);


    return res.status(200).json({
      status: 200,
      message: 'Account deleted successfully'
    });
  }
}

import nodemailer from 'nodemailer';
import Model from '../db/index';
import Mailer from '../helpers/mailer';

import formatAmount from '../helpers/formatAmount';

const transactions = new Model('transactions');
const accounts = new Model('accounts');
const users = new Model('users');

/**
 * create transporter method
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '26fdd55cbd69c7',
    pass: '8ac614886118b2'
  },
  pool: true, // use pooled connection
  rateLimit: true, // enable to make sure we are limiting
  maxConnections: 5, // set limit to 1 connection only
  maxMessages: 300 // send 3 emails per second
});


/**
 * @class TransactionController
 */
export default class TransactionController {
  /**
   * @method creditTransaction
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code, data and message properties
   */
  static async creditTransaction(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    const {
      id: cashierId, firstName, lastName,
    } = req.decoded;

    const [accountToCredit] = await accounts.select(
      ['*'],
      [`account_number=${parseInt(accountNumber, 10)}`]
    );

    if (!accountToCredit) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist'
      });
    }

    const {
      balance,
      status,
      ownerId,
      accountNumber: userAccountNumber
    } = accountToCredit;

    if (cashierId === ownerId) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to carry out that action'
      });
    }

    if (status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error:
          'Account is dormant, please activate it to carry out a transaction'
      });
    }

    const newBalance = formatAmount(balance) + formatAmount(amount);

    const [newTransaction] = await transactions.create(
      [
        'type',
        'account_number',
        'owner_id',
        'cashier_id',
        'cashier_name',
        'amount',
        'old_balance',
        'new_balance'
      ],
      [
        `'credit',
        ${userAccountNumber},
        ${ownerId},
        ${cashierId},
        '${firstName} ${lastName}',
        ${amount},
        ${balance},
        ${newBalance}`
      ]
    );

    const [accountOwner] = await users.select(['*'], [`id='${ownerId}'`]);

    // update to new balance
    const [updatedAccount] = await accounts.update([`balance =${newTransaction.newBalance}`], [
      `account_number = ${parseInt(accountNumber, 10)}`
    ]);


    // send notification to account owner
    const emailNotification = new Mailer(
      newTransaction,
      accountOwner,
      accountNumber,
      updatedAccount
    );

    await transporter.sendMail(emailNotification.mailOptions(), (error, info) => error || info);

    const data = {
      id: newTransaction.id,
      accountNumber: newTransaction.accountNumber,
      amount: formatAmount(newTransaction.amount),
      cashierId: newTransaction.cashierId,
      cashier: newTransaction.cashierName,
      type: newTransaction.type,
      oldBalance: formatAmount(newTransaction.oldBalance),
      accountBalance: formatAmount(updatedAccount.balance)
    };

    return res.status(200).json({
      status: 200,
      data,
      message: `${newTransaction.amount} was credited to your account`
    });
  }

  /**
   * @method debitTransaction
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code, data and message properties
   */
  static async debitTransaction(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const {
      role, id: cashierId, firstName, lastName,
    } = req.decoded;
    const minimumBalance = 500;

    if (role !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to carry out that action'
      });
    }

    const [accountToDebit] = await accounts.select(['*'], `account_number=${parseInt(accountNumber, 10)}`);

    if (!accountToDebit) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist'
      });
    }

    const {
      accountNumber: userAccountNumber,
      balance,
      status,
      ownerId
    } = accountToDebit;

    if (cashierId === ownerId) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to carry out that action'
      });
    }

    if (status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'This account is not active please contact the admin'
      });
    }
    const balanceWithdrawable = balance - minimumBalance;

    if (amount > balanceWithdrawable) {
      return res.status(400).json({
        status: 400,
        error: 'Insufficient funds, cannot perform transaction'
      });
    }

    const newBalance = formatAmount(balance) - formatAmount(amount);

    const [newTransaction] = await transactions.create(
      ['type',
        'account_number',
        'owner_id',
        'cashier_id',
        'cashier_name',
        'amount',
        'old_balance',
        'new_balance'],
      [
        `'debit',
        ${userAccountNumber},
        ${ownerId},
        ${cashierId},
        '${firstName} ${lastName}',
        ${amount},
        ${balance},
        ${newBalance}
        `
      ]
    );

    const [accountOwner] = await users.select(['*'], [`id='${ownerId}'`]);

    // update balance
    const [updatedAccount] = await accounts.update([`balance =${newTransaction.newBalance}`], [
      `account_number = ${parseInt(accountNumber, 10)}`
    ]);

    const emailNotification = new Mailer(
      newTransaction,
      accountOwner,
      accountNumber,
      updatedAccount
    );

    await transporter.sendMail(emailNotification.mailOptions(), (error, info) => error || info);

    const data = {
      id: newTransaction.id,
      accountNumber: newTransaction.accountNumber,
      amount: formatAmount(newTransaction.amount),
      cashierId: newTransaction.cashierId,
      cashierName: newTransaction.cashierName,
      type: newTransaction.type,
      accountBalance: formatAmount(updatedAccount.balance)
    };

    return res.status(200).json({
      status: 200,
      data,
      message: `${newTransaction.amount} was debited from your account`
    });
  }

  /**
   * @method getAllTransaction
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code, data and message properties
   */
  static async getAllTransaction(req, res) {
    const { id: userId, role } = req.decoded;

    if (role === 'client') {
      const retriveTransactions = await transactions.select(['*'], [`owner_id='${userId}'`]);


      return res.status(200).json({
        status: 200,
        data: retriveTransactions
      });
    }

    const allTransactions = await transactions.selectAll(['*']);


    return res.status(200).json({
      status: 200,
      allTransactions
    });
  }

  /**
   * @method getTransaction
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code, data and message properties
   */
  static async getTransaction(req, res) {
    const { transactionId } = req.params;
    const { id: userId, role } = req.decoded;

    let retriveTransaction;

    if (role === 'client') {
      [retriveTransaction] = await transactions.select(['*'], `id=${transactionId} AND owner_id=${userId}`);

      if (!retriveTransaction) {
        return res.status(404).json({
          status: 404,
          error: 'Transaction can not be found'
        });
      }

      const {
        id,
        type,
        accountNumber,
        ownerId,
        cashierId,
        cashierName,
        amount,
        oldBalance,
        newBalance
      } = retriveTransaction;

      const data = {
        id,
        type,
        accountNumber,
        ownerId,
        cashierId,
        cashierName,
        amount: formatAmount(amount),
        oldBalance: formatAmount(oldBalance),
        newBalance: formatAmount(newBalance)
      };

      return res.status(200).json({
        status: 200,
        data
      });
    }

    [retriveTransaction] = await transactions.select(['*'], `id=${transactionId}`);

    if (!retriveTransaction) {
      return res.status(404).json({
        status: 404,
        error: 'Transaction can not be found'
      });
    }


    const {
      id,
      type,
      accountNumber,
      ownerId,
      cashierId,
      cashierName,
      amount,
      oldBalance,
      newBalance
    } = retriveTransaction;

    const data = {
      id,
      type,
      accountNumber,
      ownerId,
      cashierId,
      cashierName,
      amount: formatAmount(amount),
      oldBalance: formatAmount(oldBalance),
      newBalance: formatAmount(newBalance)
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }
}

import moment from 'moment';
import dummyData from '../dummyDb/db';
import Transaction from '../models/Transaction.model';
import formatAmount from '../helpers/formatAmount';

const { accounts, transactions } = dummyData;
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
  static creditTransaction(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const { role, id } = req.decoded;

    if (role !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'You are not authorized to carry out that action'
      });
    }

    const accountToCredit = accounts
      .find(account => account.accountNumber === parseInt(accountNumber, 10));

    if (!accountToCredit) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist'
      });
    }

    const { balance, accountNumber: userAccountNumber } = accountToCredit;

    const newTransaction = new Transaction();
    const transactionsLength = transactions.length;
    const lastId = transactions[transactionsLength - 1].id;
    const newId = lastId + 1;

    newTransaction.id = newId;
    newTransaction.createdOn = moment().format();
    newTransaction.type = 'credit';
    newTransaction.accountNumber = userAccountNumber;
    newTransaction.cashier = id;
    newTransaction.amount = formatAmount(amount);
    newTransaction.oldBalance = formatAmount(balance);
    newTransaction.newBalance = formatAmount(amount) + formatAmount(balance);

    // update account
    accountToCredit.balance = newTransaction.newBalance;
    accountToCredit.status = 'active';

    transactions.push(newTransaction);

    const data = {
      id: newTransaction.id,
      accountNumber: newTransaction.accountNumber,
      amount: newTransaction.amount,
      cashier: newTransaction.cashier,
      type: newTransaction.type,
      status: accountToCredit.status,
      accountBalance: accountToCredit.balance
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
  static debitTransaction(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const { role, id } = req.decoded;
    const minimumBalance = 500;

    if (role !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'You are not authorized to carry out that action'
      });
    }

    const accountToDebit = accounts
      .find(account => account.accountNumber === parseInt(accountNumber, 10));

    if (!accountToDebit) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist'
      });
    }

    const { accountNumber: userAccountNumber, balance, status } = accountToDebit;

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

    const newTransaction = new Transaction();
    const transactionsLength = transactions.length;
    const lastId = transactions[transactionsLength - 1].id;
    const newId = lastId + 1;


    newTransaction.id = newId;
    newTransaction.createdOn = moment().format();
    newTransaction.type = 'debit';
    newTransaction.accountNumber = userAccountNumber;
    newTransaction.cashier = id;
    newTransaction.amount = formatAmount(amount);
    newTransaction.oldBalance = formatAmount(balance);
    newTransaction.newBalance = formatAmount(balance) - formatAmount(amount);

    // update balance
    accountToDebit.balance = newTransaction.newBalance;

    transactions.push(newTransaction);

    const data = {
      id: newTransaction.id,
      accountNumber: newTransaction.accountNumber,
      amount: newTransaction.amount,
      cashier: newTransaction.cashier,
      type: newTransaction.type,
      status: accountToDebit.status,
      accountBalance: accountToDebit.balance
    };

    return res.status(200).json({
      status: 200,
      data,
      message: `${newTransaction.amount} was debited from your account`
    });
  }
}

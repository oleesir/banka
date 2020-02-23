/**
 * @class AccountController
 */
export default class Mailer {
  /**
    * @constructor
    *
    * @param {object} transaction
    * @param  {object} accountOwner
    * @param {string} accountNumber
    * @param  {object} accountToDebitOrCredit
     */
  constructor(transaction, accountOwner, accountNumber, accountToDebitOrCredit) {
    this.transaction = transaction;
    this.accountOwner = accountOwner;
    this.accountNumber = accountNumber;
    this.accountToDebitOrCredit = accountToDebitOrCredit;
  }

  /**
 * @method mailOptions
 *
 * @returns {function} mailOutput
 */
  mailOptions() {
    return {
      from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
      to: `${this.accountOwner.email}`,
      subject: `${this.transaction.type.toUpperCase()} alert for your Banka Account: ${
        this.accountNumber
      }`,
      html: `<h3>${this.transaction.type.toUpperCase()} ALERT!!!</h3><p>Hello ${
        this.accountOwner.firstName
      }, your account was ${this.transaction.type}ed with the sum of <bold>₦${this.transaction.amount}</bold> on ${
        this.transaction.createdOn
      }. Your account balance is <bold>₦${
        this.accountToDebitOrCredit.balance
      }</bold> <br></p><p>Thank you for banking with us <br></p><p> © Banka Inc. </p>`
    };
  }
}

/**
 * @class Transaction
 */
export default class Transaction {
  /**
   * @constructor
   */
  constructor() {
    this.id = null;
    this.createdOn = null;
    this.type = null;
    this.accountNumber = null;
    this.cashier = null;
    this.amount = null;
    this.oldBalance = null;
    this.newBalance = null;
  }
}

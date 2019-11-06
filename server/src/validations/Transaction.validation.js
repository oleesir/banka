import isEmpty from '../helpers/isEmpty';
/**
 * @class TransactionValidation
 */
export default class TransactionValidation {
  /**
  * @method validateCreditTransaction
  *
  * @param {object} req
  * @param {object} res
  * @param {function} next
  *
  * @returns {object} status code and error message properties
  */
  static validateCreditTransaction(req, res, next) {
    const { amount } = req.body;
    if (amount < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Credit transaction amount cannot be less than 1 Naira'
      });
    }

    if (isEmpty(amount)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction amount cannot be empty'
      });
    }

    if (!Number(amount)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction amount can only contain digits'
      });
    }
    return next();
  }

  /**
  * @method validateDebitTransaction
  *
  * @param {object} req
  * @param {object} res
  * @param {function} next
  *
  * @returns {object} status code and error message properties
  */
  static validateDebitTransaction(req, res, next) {
    const { amount } = req.body;

    if (isEmpty(amount)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction amount cannot be empty'
      });
    }

    if (amount < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Debit transaction amount cannot be less than 1 Naira'
      });
    }

    if (!Number(amount)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction amount can only contain digits'
      });
    }
    return next();
  }

  /**
   * @method validateGetTransaction
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   *
   * @returns {Object} status code and error message properties
   */
  static validateGetTransaction(req, res, next) {
    const { transactionId } = req.params;
    const isNum = /^\d+$/; // gotten from Scott Evernden on Stack Overflow
    if (!isNum.test(transactionId)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction ID can only contain digits'
      });
    }

    return next();
  }
}

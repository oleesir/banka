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
        error: 'Credit transaction cannot be less than 1 Naira'
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
        error: 'Transactions can only contain digits'
      });
    }
    return next();
  }
}

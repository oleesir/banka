import isEmpty from '../helpers/isEmpty';

/**
 * @class AccountValidation
 */
export default class AccountValidation {
  /**
   *@method validateCreateAccount

   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @return {object} returns status error and message properties
   */
  static validateCreateAccount(req, res, next) {
    const { type } = req.body;
    if (isEmpty(type)) {
      return res.status(400).json({
        status: 400,
        error: 'Account type is required'
      });
    }

    if (type !== 'savings' && type !== 'current') {
      return res.status(400).json({
        status: 400,
        error: 'Account type can only be either savings or current'
      });
    }
    return next();
  }

  /**
   *@method validateGetAccount

   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @return {object} returns status error and message properties
   */
  static validateGetAccount(req, res, next) {
    const { accountNumber } = req.params;
    const isNum = /^\d+$/; // gotten from Scott Evernden on Stack Overflow

    if (accountNumber.length !== 10) {
      return res.status(400).json({
        status: 400,
        error: 'Account number must not be more than 10 digits'
      });
    }

    if (!isNum.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Account number can only contain digits'
      });
    }

    return next();
  }
}

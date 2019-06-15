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
    const isNum = /^\d+$/;

    if (accountNumber.length !== 10) {
      return res.status(400).json({
        status: 400,
        error: 'Account number must be 10 digits'
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

  /**
   *@method validateEditAccount

   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @return {object} returns status error and message properties
   */
  static validateEditAccount(req, res, next) {
    const { accountNumber } = req.params;
    const { status } = req.body;
    const isNum = /^\d+$/;

    if (accountNumber.length !== 10) {
      return res.status(400).json({
        status: 400,
        error: 'Account number must be 10 digits'
      });
    }

    if (!isNum.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Account number can only contain digits'
      });
    }

    if (status !== 'dormant' && status !== 'active') {
      return res.status(400).json({
        status: 400,
        error: 'Status can only be active or dormant'
      });
    }

    return next();
  }
}

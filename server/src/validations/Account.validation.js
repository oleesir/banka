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
}

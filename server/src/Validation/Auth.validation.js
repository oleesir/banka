import isEmpty from '../helper/isEmpty';
/**
 * @exports
 *@class AuthValidation
 */
export default class AuthValidation {
  /**
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {object} status code and error message properties
   */
  static validateSignup(req, res, next) {
    const {
      firstName, lastName, email, password
    } = req.body;

    // eslint-disable-next-line no-useless-escape
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const containsAlphabets = /^[a-zA-Z ]*$/;
    if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(email) && isEmpty(password)) {
      return res.status(400).json({
        status: 400,
        error: 'All fields are required'
      });
    }

    if (isEmpty(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name is required'
      });
    }

    if (isEmpty(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name is required'
      });
    }

    if (isEmpty(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required'
      });
    }

    if (!validEmail.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid email address'
      });
    }

    if (!containsAlphabets.test(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name can only contain alphabets'
      });
    }

    if (!containsAlphabets.test(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name can only contain alphabets'
      });
    }

    if (isEmpty(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password is required'
      });
    }

    if (password.trim().length < 6) {
      return res.status(400).json({
        status: 400,
        error: 'Password must be at least 6 characters long'
      });
    }
    return next();
  }
}
export {
  isEmpty
};

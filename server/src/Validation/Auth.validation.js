/* eslint-disable no-useless-escape */
import isEmpty from '../helper/isEmpty';
import validateEmail from '../helper/validateEmail';
import validateAlphabets from '../helper/validateAlphabets';
/**
 * @exports
 *@class AuthValidation
 */
export default class AuthValidation {
  /**
   * @method validateSignup
   *
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

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid email address'
      });
    }

    if (!validateAlphabets(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name can only contain alphabets'
      });
    }

    if (!validateAlphabets(lastName)) {
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

  /**
   * @method validateLogin
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {object} status code and error message properties
   */
  static validateLogin(req, res, next) {
    const { email, password } = req.body;
    if (isEmpty(email) && isEmpty(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Email and password are required'
      });
    }

    if (isEmpty(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid email address'
      });
    }

    if (isEmpty(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password is required'
      });
    }
    return next();
  }
}
export {
  isEmpty
};

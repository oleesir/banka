import isEmpty from '../helpers/isEmpty';
import isValidEmail from '../helpers/validateEmail';
import containsAlphabets from '../helpers/containsAlphabets';


/**
 * @class UserValidation
 */
export default class UserValidation {
/**
   *@method validateCreateStaff

   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @return {object} returns status error and message properties
   */
  static validateCreateStaff(req, res, next) {
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
        error: 'Firstname is required'
      });
    }

    if (isEmpty(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Lastname is required'
      });
    }


    if (isEmpty(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required'
      });
    }


    if (!isValidEmail(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid email'
      });
    }

    if (!containsAlphabets(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'Firstname can only contain alphabets'
      });
    }

    if (!containsAlphabets(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Lastname can only contain alphabets'
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

import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * @class Encryption
 */
export default class Encryption {
  /**
   * @method encryptPassword
   * @param {string}  password
   *
   * @returns {string} hashedPassword
   */
  static encryptPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}

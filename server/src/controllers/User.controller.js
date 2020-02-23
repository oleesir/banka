import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Model from '../db/index';
import Encryption from '../helpers/Encryption';

const { encryptPassword } = Encryption;

dotenv.config();

const users = new Model('users');

/**
 * @class UserController
 */
export default class UserController {
  /**
 * @method createStaff
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {object} status code and data message
 */
  static async createStaff(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;

    const [findStaff] = await users.select(['*'], [`email='${email}'`]);

    if (findStaff) return res.status(409).json({ status: 409, error: 'Staff already exists' });

    const hashedPassword = encryptPassword(password);
    const userEmail = email.toLowerCase();

    const [newStaff] = await users.create(['first_name', 'last_name', 'email', 'password', 'role'],
      [`'${firstName}','${lastName}','${userEmail}','${hashedPassword}','staff'`]);

    const payload = {
      firstName: newStaff.firstName,
      lastName: newStaff.lastName,
      email: newStaff.userEmail,
      role: newStaff.role
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });

    delete newStaff.password;

    const data = { token, ...newStaff };

    return res.status(201).json({ status: 201, data, message: 'Staff created successfully' });
  }
}

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Model from '../db/index';
import Encryption from '../helpers/Encryption';

dotenv.config();

const users = new Model('users');

const { encryptPassword, comparePassword } = Encryption;

/**
 * @exports
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method signup
   *
   * @param {object} req request
   * @param {object} res response
   *
   * @returns {object} status code, data and message properties
   */
  static async signup(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;

    const existingUser = await users.select(['email'], [`email='${email}'`]);

    if (existingUser.length) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists'
      });
    }

    const hashedPassword = encryptPassword(password);

    const [newUser] = await users.create(['first_name', 'last_name', 'email', 'password', 'role'],
      [`'${firstName}','${lastName}','${email}','${hashedPassword}','client'`]);

    const payload = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });

    delete newUser.password;

    const data = {
      token,
      ...newUser
    };

    return res.status(201).json({
      status: 201,
      data,
      message: 'User registered successfully'
    });
  }

  /**
   * @method signin
   *
   * @param {object} req request
   * @param {object} res response
   *
   * @returns {object}  status code, data and message properties
   */
  static async signin(req, res) {
    const { email, password } = req.body;

    const [findUser] = await users.select(['*'], `email='${email}'`);

    if (!findUser) {
      return res.status(401).json({
        status: 401,
        error: 'Email or password is incorrect'
      });
    }

    if (findUser) {
      const {
        id,
        firstName,
        lastName,
        role
      } = findUser;


      const verifyUserPassword = comparePassword(password, findUser.password);

      if (!verifyUserPassword) {
        return res.status(401).json({
          status: 401,
          error: 'Email or password is incorrect'
        });
      }

      const payload = {
        id,
        firstName,
        lastName,
        email,
        role
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });

      const data = {
        ...payload,
        token
      };

      return res.status(200).json({
        status: 200,
        data,
        message: 'Login successful'
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Email or password is incorrect'
    });
  }
}

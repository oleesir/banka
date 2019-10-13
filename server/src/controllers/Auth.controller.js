
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/User.model';
import dummyData from '../dummyDb/db';
import Encryption from '../helpers/Encryption';

dotenv.config();

const { users } = dummyData;
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
  static signup(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;


    const userExists = users.some(user => user.email === email);
    const hashedPassword = encryptPassword(password);

    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists'
      });
    }

    const newUser = new User();
    const usersLength = users.length;
    const lastId = users[usersLength - 1].id;
    const newId = lastId + 1;

    newUser.id = newId;
    newUser.firstName = firstName.trim();
    newUser.lastName = lastName.trim();
    newUser.email = email.trim();
    newUser.password = hashedPassword;
    newUser.role = 'client';
    newUser.createdAt = moment().format('LLLL');

    users.push(newUser);

    const payload = { id: newUser.id, email: newUser.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });
    const data = {
      token,
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt
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
  static signin(req, res) {
    const { email, password } = req.body;

    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        const verifyPassword = comparePassword(password, users[i].password);

        if (!verifyPassword) {
          return res.status(401).json({
            status: 401,
            error: 'Email or password is incorrect'
          });
        }

        const {
          id, firstName, lastName, role, isAdmin
        } = users[i];

        const payload = {
          id,
          firstName,
          lastName,
          email,
          role,
          isAdmin
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });

        const data = {
          token,
          id,
          firstName,
          lastName,
          email,
          role,
          isAdmin
        };
        return res.status(200).json({
          status: 200,
          data,
          message: 'Login successful'
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: 'Email or password is incorrect'
    });
  }
}

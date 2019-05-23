import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/User.model';
import dummyData from '../dummyDb/db';
import encrypt from '../helper/encrypt';

dotenv.config();

const { users } = dummyData;
const { encryptPassword } = encrypt;

/**
 * @exports
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method signup
   * @param {object} req request
   * @param {object} res response
   *
   * @returns {object} returns status code, data and message properties
   */
  static signup(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;

    const existingUser = users.some(user => user.email === email);
    const hash = encryptPassword(password);
    if (existingUser) {
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
    newUser.hash = hash.trim();
    newUser.type = 'client';
    newUser.createdAt = moment().format('LLLL');

    users.push(newUser);

    const payload = { id: newUser.id, email: newUser.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1hr' });
    const data = {
      token,
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      type: newUser.type,
      createdAt: newUser.createdAt
    };
    return res.status(201).json({
      status: 201,
      data,
      message: 'User registered successfully'
    });
  }
}

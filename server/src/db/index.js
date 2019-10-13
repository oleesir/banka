import { Pool } from 'pg';
import dotenv from 'dotenv';
import getConfig from './config';


dotenv.config();

/**
 * @class Model
 */
export default class Model {
  /**
   * @constructor
   * @param {object} table
   */
  constructor(table) {
    this.table = table;
    this.pool = Model.init();
    this.pool.on('connect', () => { console.log('connected to db'); });
  }

  /**
   * @static
   * @method init
   *
   * @returns {Pool} connection
   */
  static init() {
    const config = getConfig();

    return new Pool(config);
  }

  /**
   * @method select
   *
   * @param {array} attributes
   * @param {array} constraints
   *
   * @returns {query} query
   */
  async select(attributes, constraints) {
    const query = `SELECT ${attributes} FROM ${this.table} WHERE ${constraints}`;

    console.log(query);

    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(query, err.message);
    }
  }

  /**
   * @method create
   *
   * @param {array} attributes
   * @param {array} constraints
   *
   * @returns {query} query
   */
  async create(attributes, constraints) {
    const query = `INSERT INTO ${this.table}({${attributes}) VALUES (${constraints}) RETURNING *`;
    console.log(query);

    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(query, err.message);
    }
  }

  /**
   * @method update
   *
   * @param {array} attributes
   * @param {array} constraints
   *
   * @returns {query} query
   */
  async update(attributes, constraints) {
    const query = `UPDATE ${this.table} SET ${attributes} WHERE ${constraints} RETURNING *`;

    console.log(query);

    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(query, err.message);
    }
  }

  /**
   * @method delete
   *
   * @param {array} constraints
   *
   * @returns {query} query
   */
  async delete(constraints) {
    const query = `DELETE FROM ${this.table} WHERE ${constraints} `;

    console.log(query);

    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(query, err.message);
    }
  }

  /**
   * @method selectAll
   *
   * @param {array} attributes
   *
   * @returns {query} query
   */
  async selectAll(attributes) {
    const query = `SELECT ${attributes} FROM ${this.table}`;

    console.log(query);

    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(query, err.message);
    }
  }
}

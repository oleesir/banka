require('dotenv').config();

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_NAME_TEST,
  DB_PASSWORD
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: DB_USER || 'olive',
    password: DB_PASSWORD || '',
    database: DB_NAME_TEST || 'banka-test',
    host: DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};

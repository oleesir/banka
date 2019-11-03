export const dropTables = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS accounts CASCADE;
    DROP TABLE IF EXISTS transactions CASCADE;
`;

export const dropTypes = `
    DROP TYPE IF EXISTS ACCOUNT_STATUS;

`;

export const createTypes = `
    CREATE TYPE ACCOUNT_STATUS AS ENUM ('active','dormant','draft');
`;

export const createTables = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL PRIMARY KEY,
        account_number BIGINT NOT NULL,
        owner_id INT NOT NULL,
        owner_name VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        status ACCOUNT_STATUS NOT NULL DEFAULT 'dormant',
        balance NUMERIC NOT NULL,
        owner_email TEXT NOT NULL,
        FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE SET NULL,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        type VARCHAR NOT NULL,
        account_number BIGINT NOT NULL,
        owner_id INT NOT NULL,
        cashier_id INT NOT NULL,
        cashier_name VARCHAR NOT NULL,
        amount NUMERIC NOT NULL,
        old_balance NUMERIC NOT NULL,
        new_balance NUMERIC NOT NULL,
        FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY(cashier_id) REFERENCES users(id) ON DELETE SET NULL,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);    
`;
export default {
  dropTables, createTypes, createTables, dropTypes
};

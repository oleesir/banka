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
        firstName VARCHAR NOT NULL,
        lastName VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        password TEXT NOT NULL,
        isAdmin BOOLEAN NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL PRIMARY KEY,
        accountNumber BIGINT NOT NULL,
        ownerId INT NOT NULL,
        ownerName VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        status ACCOUNT_STATUS NOT NULL DEFAULT 'active',
        balance NUMERIC NOT NULL,
        ownerEmail TEXT NOT NULL,
        FOREIGN KEY(ownerId) REFERENCES users(id) ON DELETE SET NULL,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        type VARCHAR NOT NULL,
        accountNumber BIGINT NOT NULL,
        ownerId INT NOT NULL,
        cashierId INT NOT NULL,
        cashierName VARCHAR NOT NULL,
        amount NUMERIC NOT NULL,
        oldBalance NUMERIC NOT NULL,
        newBalance NUMERIC NOT NULL,
        FOREIGN KEY(ownerId) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY(cashierId) REFERENCES users(id) ON DELETE SET NULL,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);    
`;
export default {
  dropTables, createTypes, createTables, dropTypes
};

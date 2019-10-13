import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { ADMIN_PASSWORD, USER_PASSWORD } = process.env;
const adminPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
const userPassword = bcrypt.hashSync(USER_PASSWORD, 10);

export default `

  INSERT INTO users (firstName, lastName, email ,password, isAdmin)
  VALUES('Olisa', 'Emeka', 'oleesir@gmail.com' ,'${adminPassword}', true); 
  INSERT INTO users (firstName, lastName, email ,password, isAdmin)
  VALUES('Nneka', 'Oguah', 'nneka@gmail.com' ,'${userPassword}', false); 
  INSERT INTO users (firstName, lastName, email ,password, isAdmin)
  VALUES('James', 'Udoh', 'james@gmail.com' ,'${userPassword}', false); 
  INSERT INTO users (firstName, lastName, email ,password, isAdmin)
  VALUES('Amaka', 'Emodi', 'amaka@gmail.com' ,'${userPassword}', true); 
  INSERT INTO users (firstName, lastName, email ,password, isAdmin)
  VALUES('Ivy', 'Lee', 'ivy@gmail.com' ,'${userPassword}', false); 

  INSERT INTO accounts (accountNumber, ownerId, ownerName, ownerEmail, type, status, balance)
  VALUES(1234567890, 2, 'Nneka Oguah','nneka@gmail.com', 'current', 'active', 40000.00);
  INSERT INTO accounts (accountNumber, ownerId, ownerName, ownerEmail, type, status, balance)
  VALUES(8888888888, 3, 'James Udoh', 'james@gmail.com', 'savings', 'dormant', 5000.00);
  INSERT INTO accounts (accountNumber, ownerId, ownerName, ownerEmail, type, status, balance)
  VALUES(8989898989, 3, 'James Udoh', 'james@gmail.com', 'current', 'draft', 3000.00);
  INSERT INTO accounts (accountNumber, ownerId, ownerName, ownerEmail, type, status, balance)
  VALUES(1234565432, 2, 'Nneka Oguah', 'nneka@gmail.com', 'savings', 'active', 2000.00);
  INSERT INTO accounts (accountNumber, ownerId, ownerName, ownerEmail, type, status, balance)
  VALUES(9876543210, 3, 'James Udoh', 'james@gmail.com', 'savings', 'active', 8000.00);

  INSERT INTO transactions (type, accountNumber, ownerId, cashierId, cashierName, amount, oldBalance, newBalance)
  VALUES('credit', 1234567890, 2, 5, 'Ivy Lee', 2000.00, 4000.00, 6000.00);
  INSERT INTO transactions (type, accountNumber, ownerId, cashierId, cashierName, amount, oldBalance, newBalance)
  VALUES('debit', 9876543210, 3, 4, 'Amaka Emodi', 1000.00, 8000.00, 7000.00);
  INSERT INTO transactions (type, accountNumber, ownerId, cashierId, cashierName, amount, oldBalance, newBalance)
  VALUES('credit', 1234565432, 2, 5, 'Ivy Lee', 1000.00, 2000.00, 3000.00);
`;

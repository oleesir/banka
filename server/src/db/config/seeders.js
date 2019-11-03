import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { ADMIN_PASSWORD, USER_PASSWORD } = process.env;
const adminPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
const userPassword = bcrypt.hashSync(USER_PASSWORD, 10);

export default `

  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Olisa', 'Emeka', 'oleesir@gmail.com' ,'${adminPassword}', 'admin'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Nneka', 'Oguah', 'nneka@gmail.com' ,'${userPassword}', 'client'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('James', 'Udoh', 'james@gmail.com' ,'${userPassword}', 'client'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Amaka', 'Emodi', 'amaka@gmail.com' ,'${adminPassword}', 'staff'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Ivy', 'Lee', 'ivy@gmail.com' ,'${adminPassword}', 'staff'); 

  INSERT INTO accounts (account_number, owner_id, owner_name, owner_email, type, status, balance)
  VALUES(1234567890, 2, 'Nneka Oguah','nneka@gmail.com', 'current', 'active', 40000.00);
  INSERT INTO accounts (account_number, owner_id, owner_name, owner_email, type, status, balance)
  VALUES(8888888888, 3, 'James Udoh', 'james@gmail.com', 'savings', 'dormant', 5000.00);
  INSERT INTO accounts (account_number, owner_id, owner_name, owner_email, type, status, balance)
  VALUES(8989898989, 3, 'James Udoh', 'james@gmail.com', 'current', 'draft', 3000.00);
  INSERT INTO accounts (account_number, owner_id, owner_name, owner_email, type, status, balance)
  VALUES(1234565432, 2, 'Nneka Oguah', 'nneka@gmail.com', 'savings', 'active', 2000.00);
  INSERT INTO accounts (account_number, owner_id, owner_name, owner_email, type, status, balance)
  VALUES(9876543210, 3, 'James Udoh', 'james@gmail.com', 'savings', 'active', 8000.00);

  INSERT INTO transactions (type, account_number, owner_id, cashier_id, cashier_name, amount, old_balance, new_balance)
  VALUES('credit', 1234567890, 2, 5, 'Ivy Lee', 2000.00, 4000.00, 6000.00);
  INSERT INTO transactions (type, account_number, owner_id, cashier_id, cashier_name, amount, old_balance, new_balance)
  VALUES('debit', 9876543210, 3, 4, 'Amaka Emodi', 1000.00, 8000.00, 7000.00);
  INSERT INTO transactions (type, account_number, owner_id, cashier_id, cashier_name, amount, old_balance, new_balance)
  VALUES('credit', 1234565432, 2, 5, 'Ivy Lee', 1000.00, 2000.00, 3000.00);
`;

import db from '../dummyDb/db';

const { accounts } = db;
/**
 * @description Function to generate 10 Digit Random Number
 *
 * @returns {number} it returns random numbers
 */
const generateNumber = () => {
  const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  const existingNumber = accounts.some(acct => acct.accountNumber === accountNumber);

  if (existingNumber) {
    return generateNumber();
  }
  return accountNumber;
};

export default generateNumber;

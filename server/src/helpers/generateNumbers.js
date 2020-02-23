import Model from '../db/index';

const accounts = new Model('accounts');
/**
 * @description Function to generate 10 Digit Random Number
 *
 * @returns {number} it returns random numbers
 */
const generateNumber = async () => {
  const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  const existingNumber = await accounts.select(['account_number'], [`account_number='${accountNumber}'`]);

  if (existingNumber.length > 0) return generateNumber();

  return accountNumber;
};

export default generateNumber;

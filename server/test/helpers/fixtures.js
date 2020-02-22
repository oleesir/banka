import jwt from 'jsonwebtoken';

const newUser = {
  firstName: 'ryan',
  lastName: 'gosling',
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const userAccountNumber = 3094781960;
const invalidAccountNumber = 34564765298;
const doesNotContainDigits = '35278365u4';
const emptyAccountNumber = '';
const nonExistingAccountNumber = 9879878967;
const lessThanTenDigits = 2345632;
const wrongAccountNumber = 3452783652;
const accountNumberTransaction = 9987456386;
const dormantTransaction = 9870654673;
const dormantAccountNumber = 8888888888;
const deleteAccountNumber = 1234352387;
const activeAccountNumber = 1234567890;
const transactionId = 1;
const wrongTransactionId = 2;
const nonExistingTransactionId = 500;
const notFormattedTransactionId = '1u4';

const newUserTwo = {
  firstName: 'james',
  lastName: 'green',
  email: 'green@gmail.com',
  password: 'jamesgreen'
};

const authUser = {
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const staffPayload = {
  id: 4,
  email: 'amaka@gmail.com',
  firstName: 'Amaka',
  lastName: 'Emodi',
  password: 'secret',
  role: 'staff'
};

const clientPayload = {
  id: 5,
  email: 'john@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'secret',
  role: 'client'
};

const clientPayloadTwo = {
  id: 6,
  email: 'jaga@gmail.com',
  firstName: 'Jaga',
  lastName: 'White',
  password: 'secret',
  role: 'client'
};

const clientPayloadTwoo = {
  email: 'nneka@gmail.com',
  password: 'helloworldtwo'
};

const adminPayload = {
  id: 1,
  email: 'olisa@gmail.com',
  firstName: 'Olisa',
  lastName: 'Emodi',
  password: 'secret',
  role: 'admin'
};

const clientToken = jwt.sign(clientPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const clientToken2 = jwt.sign(clientPayloadTwoo, process.env.SECRET_KEY, { expiresIn: '1day' });
const clientTokenTwo = jwt.sign(clientPayloadTwo, process.env.SECRET_KEY, { expiresIn: '1day' });
const staffToken = jwt.sign(staffPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const adminToken = jwt.sign(adminPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const expiredToken = jwt.sign(clientPayload, process.env.SECRET_KEY, { expiresIn: '1' });
const fakeToken = 'uh2ygy34758357t.njidvfhvbrubbjb';


const emptyAuthUser = {
  email: '',
  password: ''
};

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const creditTransaction = {
  amount: 1500
};

const debitTransaction = {
  amount: 500
};

const emptyAmount = '';

const negativeInput = {
  amount: -12345
};

const invalidCharacters = {
  amount: '3455u6'
};

const insufficientTransaction = {
  amount: 900000000
};

const dormantAccount = {
  status: 'dormant'
};

const editStatus = {
  status: 'active'
};

const emptyStatus = {
  status: ''
};

const invalidStatus = {
  status: 'irkfklm'
};

const newStaff = {
  firstName: 'jack',
  lastName: 'daniel',
  email: 'dan@gmail.com',
  password: 'qwertyuiop'
};

const emptyStaffField = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const emptyStaffFirstName = {
  ...newStaff, firstName: ''
};

const emptyStaffLastName = {
  ...newStaff, lastName: ''
};

const existingStaffEmail = { ...newStaff, email: 'dan@gmail.com' };
const invalidStaffPasswordLength = { ...newStaff, password: 'jk' };
const emptyStaffEmail = { ...newStaff, email: '' };
const invalidStaffEmail = { ...newStaff, email: 'asdegmail.com' };
const emptyStaffPassword = { ...newStaff, password: '' };
const nonAlphabetsStaffFirstName = { ...newStaff, firstName: '/8465' };
const nonAlphabetsStaffLastName = { ...newStaff, lastName: '/8465' };
const emptyFirstName = { ...newUser, firstName: '' };
const emptyLastName = { ...newUser, lastName: '' };
const nonAlphabetsFirstName = { ...newUser, firstName: '/865' };
const nonAlphabetsLastName = { ...newUser, lastName: '/865' };
const emptyEmail = { ...newUser, email: '' };
const invalidEmail = { ...newUser, email: 'ryangmail.com' };
const emptyPassword = { ...newUser, password: '' };
const invalidPasswordLength = { ...newUser, password: 'rya' };
const existingEmail = { ...newUser, email: 'ryan@gmail.com' };
const emptyEmailAuthUser = { ...authUser, email: '' };
const wrongEmailAuthUser = { ...authUser, email: 'ryangmail.com' };
const emptyPasswordAuthUser = { ...authUser, password: '' };
const wrongUserAuth = { ...authUser, email: 'ryan@gmail.com', password: 'ryangoreswe' };
const wrongUserAuthEmail = { ...authUser, email: 'kennygray@gmail.com', password: 'ryangosl' };
const newAccount = { type: 'savings' };
const newAccountTwo = { type: 'current' };
const activeAccount = { type: 'savings', status: 'active' };
const emptyType = { type: '' };
const invalidNewAccount = { type: 'credit' };

export {
  newUser,
  clientTokenTwo,
  activeAccount,
  emptyFirstName,
  emptyLastName,
  emptyUser,
  nonAlphabetsFirstName,
  nonAlphabetsLastName,
  emptyEmail,
  invalidEmail,
  emptyPassword,
  invalidPasswordLength,
  existingEmail,
  authUser,
  emptyAuthUser,
  emptyEmailAuthUser,
  emptyPasswordAuthUser,
  wrongUserAuth,
  wrongUserAuthEmail,
  wrongEmailAuthUser,
  newAccount,
  emptyType,
  clientToken2,
  wrongTransactionId,
  invalidNewAccount,
  newUserTwo,
  dormantAccountNumber,
  newAccountTwo,
  staffToken,
  nonExistingTransactionId,
  clientToken,
  adminToken,
  expiredToken,
  transactionId,
  fakeToken,
  userAccountNumber,
  invalidAccountNumber,
  emptyAccountNumber,
  activeAccountNumber,
  doesNotContainDigits,
  nonExistingAccountNumber,
  lessThanTenDigits,
  wrongAccountNumber,
  creditTransaction,
  accountNumberTransaction,
  emptyAmount,
  negativeInput,
  invalidCharacters,
  debitTransaction,
  insufficientTransaction,
  dormantAccount,
  dormantTransaction,
  deleteAccountNumber,
  editStatus,
  emptyStatus,
  invalidStatus,
  newStaff,
  emptyStaffField,
  emptyStaffFirstName,
  emptyStaffLastName,
  nonAlphabetsStaffFirstName,
  nonAlphabetsStaffLastName,
  emptyStaffEmail,
  invalidStaffEmail,
  emptyStaffPassword,
  existingStaffEmail,
  invalidStaffPasswordLength
};

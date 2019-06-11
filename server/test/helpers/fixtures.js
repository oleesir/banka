import jwt from 'jsonwebtoken';

const newUser = {
  firstName: 'ryan',
  lastName: 'gosling',
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const userAccountNumber = 3452783652;
const invalidAccountNumber = 34564765298;
const doesNotContainDigits = '35278365u4';
const emptyAccountNumber = '';
const nonExistingAccountNumber = 9879878967;
const lessThanTenDigits = 2345632;
const wrongAccountNumber = 3452783652;
const accountNumberTransaction = 9987456386;

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

const adminPayload = {
  id: 2,
  email: 'amaka@gmail.com',
  firstName: 'Amaka',
  lastName: 'Emodi',
  password: 'secret',
  type: 'staff',
  isAdmin: true,
};

const clientPayload = {
  id: 3,
  email: 'ivy@gmail.com',
  firstName: 'Iveren',
  lastName: 'Shaguy',
  password: 'secret',
  role: 'client',
};

const staffPayload = {
  id: 1,
  email: 'olisa@gmail.com',
  firstName: 'Olisa',
  lastName: 'Emodi',
  password: 'secret',
  role: 'staff',
  isAdmin: false
};


const clientToken = jwt.sign(clientPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const staffToken = jwt.sign(staffPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const adminToken = jwt.sign(adminPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const expiredToken = jwt.sign(clientPayload, process.env.SECRET_KEY, { expiresIn: '1' });
const fakeToken = 'uh2ygy34758357t.njidvfhvbrubbjb';

const staffUser = {
  email: 'amaka@gmail.com',
  password: 'secret'
};

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

const emptyAmount = '';

const negativeInput = {
  amount: -12345
};

const invalidCharacters = {
  amount: '3455u6'
};


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
const emptyType = { type: '' };
const invalidNewAccount = { type: 'credit' };

export {
  newUser,
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
  invalidNewAccount,
  staffUser,
  newUserTwo,
  newAccountTwo,
  staffToken,
  clientToken,
  adminToken,
  expiredToken,
  fakeToken,
  userAccountNumber,
  invalidAccountNumber,
  emptyAccountNumber,
  doesNotContainDigits,
  nonExistingAccountNumber,
  lessThanTenDigits,
  wrongAccountNumber,
  creditTransaction,
  accountNumberTransaction,
  emptyAmount,
  negativeInput,
  invalidCharacters
};

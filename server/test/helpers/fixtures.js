const newUser = {
  firstName: 'ryan',
  lastName: 'gosling',
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const authUser = {
  email: 'ryan@gmail.com',
  password: 'ryangosl'
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
const newAccount = {
  type: 'savings'
};
const emptyType = {
  type: ''
};
const invalidNewAccount = {
  type: 'credit'
};

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
  invalidNewAccount
};

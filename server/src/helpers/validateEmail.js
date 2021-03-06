/* eslint-disable no-useless-escape */

/**
 * @description Function to check for a valid email
 *
 * @param {string} email The email to be checked
 *
 * @returns {Boolean} true or false
 */
const isValidEmail = (email) => {
  const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return isValid.test(String(email).toLowerCase());
};

export default isValidEmail;

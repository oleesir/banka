/* eslint-disable no-useless-escape */

/*
* @description Function to check for a valid email
*
* @param {any} value The data type to be checked
*
* @returns {Boolean}
*/
const isValidEmail = (email) => {
  const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return isValid.test(String(email).toLowerCase());
};

export default isValidEmail;

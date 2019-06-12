/**
 * @description Function to check that input is not empty, undefined or null
 *
 * @param {any} value The data type to be checked
 *
 * @returns {Boolean} true or false
 */
const containsAlphabets = (value) => {
  const containsAlphabet = /^[a-zA-Z ]*$/;
  return containsAlphabet.test(value);
};
export default containsAlphabets;

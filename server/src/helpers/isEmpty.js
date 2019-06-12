/*
* @description Function to check that input is not empty, undefined or null
*
* @param {any} value The data type to be checked
*
* @returns {Boolean}
*/
const isEmpty = value => (
  value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0)
);

export default isEmpty;

/**
 * @description Function to format digits
 *
 * @param {any} value The data type to be checked
 *
 * @returns {Boolean} true or false
 */
const formatAmount = value => Number(parseFloat(value).toFixed(2));
export default formatAmount;

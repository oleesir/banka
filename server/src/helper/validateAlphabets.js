const validateAlphabets = (value) => {
  const containsAlphabets = /^[a-zA-Z ]*$/;
  return containsAlphabets.test(value);
};
export default validateAlphabets;

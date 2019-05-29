const containsAlphabets = (value) => {
  const containsAlphabet = /^[a-zA-Z ]*$/;
  return containsAlphabet.test(value);
};
export default containsAlphabets;

const allElementsOfBothArraysAreEqual = (arr_1, arr_2) => {
  if (arr_1.length !== arr_2.length) {
    return false;
  }

  return arr_1.every((el, i) => el === arr_2[i]);
};

export { allElementsOfBothArraysAreEqual };

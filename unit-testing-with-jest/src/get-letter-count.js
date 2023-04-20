const getLetterCount = string => {
  if (string === '') {
    return {};
  }

  return string
    .replaceAll(/\s+/g, '')
    .toLowerCase()
    .split('')
    .reduce((acc, char) => {
      if (acc[char]) {
        acc[char] += 1;
      } else {
        acc[char] = 1;
      }

      return acc;
    }, {});
};

export { getLetterCount };

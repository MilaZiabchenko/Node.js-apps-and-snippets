import { getLetterCount } from './get-letter-count.js';
import { sortObjectByKeys } from './utils/sort-object-by-keys.js';
import { allElementsOfBothArraysAreEqual } from './utils/check-two-arrays-equality.js';

const isAnagram = (string_1, string_2) => {
  const letterCount_1 = getLetterCount(string_1);
  const letterCount_2 = getLetterCount(string_2);

  const letterCountSortedByKey_1 = sortObjectByKeys(letterCount_1);
  const letterCountSortedByKey_2 = sortObjectByKeys(letterCount_2);

  return (
    allElementsOfBothArraysAreEqual(
      Object.keys(letterCountSortedByKey_1),
      Object.keys(letterCountSortedByKey_2)
    ) &&
    allElementsOfBothArraysAreEqual(
      Object.values(letterCountSortedByKey_1),
      Object.values(letterCountSortedByKey_2)
    )
  );
};

export { isAnagram };

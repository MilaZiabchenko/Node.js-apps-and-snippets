import { getLetterCount } from './get-letter-count.js';

describe('getLetterCount functionality', () => {
  it('should return an empty object when passed an empty string', () => {
    const actual = getLetterCount('');
    const expected = {};

    expect(actual).toEqual(expected);
  });

  it('should return an object with correct letter count for a word with only one of each letter, excluding white spaces and ignoring case', () => {
    const actual = getLetterCount('Cat power');
    const expected = { c: 1, a: 1, t: 1, p: 1, o: 1, w: 1, e: 1, r: 1 };

    expect(actual).toEqual(expected);
  });

  it('should return an object with correct letter count for words with more than one of certain letters, excluding white spaces and ignoring case', () => {
    const actual = getLetterCount('Mississippi');
    const expected = { m: 1, i: 4, s: 4, p: 2 };

    expect(actual).toEqual(expected);
  });
});

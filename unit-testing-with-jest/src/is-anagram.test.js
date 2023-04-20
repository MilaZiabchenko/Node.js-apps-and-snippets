import { isAnagram } from './is-anagram.js';

describe('isAnagram functionality', () => {
  it('should return true if two strings are anagrams of each other and false otherwise', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
    expect(isAnagram('listens', 'silent')).toBe(false);
    expect(isAnagram('elbow', 'below')).toBe(true);
    expect(isAnagram('elbows', 'below')).toBe(false);
  });
	
  it('should return true if two strings are anagrams of each other and false otherwise excluding white spaces', () => {
    expect(isAnagram('conversation', 'voices rant on')).toBe(true);
    expect(isAnagram('conversations', 'voices rant on')).toBe(false);
  });

  it('should return true if two strings are anagrams of each other and false otherwise ignoring case', () => {
    expect(isAnagram('STATE', 'taste')).toBe(true);
  });
});

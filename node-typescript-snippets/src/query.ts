type Query<T> = {
  [K in keyof T]: (value: T[K]) => boolean;
};

const getMatches = <T extends Record<string, any>>(
  items: T[],
  query: Query<T>
) =>
  items.filter(item => {
    for (const property of Object.keys(item)) {
      if (query[property] && query[property](item[property])) {
        return true;
      }
    }

    return false;
  });

const matches = getMatches(
  [
    { name: 'Ted', age: 12 },
    { name: 'Angie', age: 33 }
  ],
  {
    name: name => name === 'Angie',
    age: age => age > 30
  }
);

console.log(matches);

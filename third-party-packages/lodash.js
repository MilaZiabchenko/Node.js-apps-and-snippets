import _ from 'lodash';

const greet = _.once(name => {
  console.log(`Hello, ${name}!`);
});

greet('Leo');
greet('Mi');

const reduce = (arr, reducer, initialState) => {
  let state = initialState;
  let index = 0;

  if (_.isNil(state)) {
    state = arr[index++];
  }

  for (let action of arr) {
    state = reducer(state, action);
  }

  return state;
};

console.log(reduce([1, 2, 3, 4, 5], (x, y) => x + y));
console.log(reduce([1, 2, 3, 4, 5], (x, y) => x + y, 0));
console.log(reduce([1, 2, 3, 4, 5], (x, y) => x + y, _.random(0, 10)));
console.log(_.flattenDeep([1, 2, [3, [4, [5]]]]));
console.log(
  _.isEqual(
    {
      name: 'Mi',
      interests: [{ coding: 'every day', bicycling: 'since spring till fall' }]
    },
    {
      name: 'Mi',
      interests: [{ coding: 'every day', bicycling: 'since spring till fall' }]
    }
  )
);

const admin = 'Leo';

let count = 0;

const inc = () => ++count;
const getCount = () => count;

module.exports = {
  admin,
  inc,
  getCount
};

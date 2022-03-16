/* eslint-disable no-param-reassign */
const random = (lower, upper) => {
  if (lower === undefined && upper === undefined) {
    return 0;
  }

  if (upper === undefined) {
    upper = lower;
    lower = 0;
  }

  let temp;
  if (lower > upper) {
    temp = lower;
    lower = upper;
    upper = temp;
  }

  return Math.floor(lower + Math.random() * upper);
};

module.exports = { random };

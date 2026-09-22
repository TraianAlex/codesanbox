const add = (x, y) => x + y;
const unary = (fn) => (arg) => fn( arg );
const partial = (fn, ...presetArgs) =>
  (...laterArgs) => fn( ...presetArgs, ...laterArgs );

console.log('no-unary function')
console.log([1, 2, 3, 4, 5].map(partial(add, 3)));

console.log('unary function')
console.log([1, 2, 3, 4, 5].map(unary(partial(add, 3))));

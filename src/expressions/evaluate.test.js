const parse = require('./parse');
const evaluate = require('./evaluate');

test('Evaluate simple expression', () => {
  const tokens = parse('2 * 3');
  const value = evaluate(tokens);
  expect(parseInt(value)).toBe(6);
});

test('Evaluate simple expression with parens', () => {
  const tokens = parse('(2 * 3)');
  const value = evaluate(tokens);
  expect(parseInt(value)).toBe(6);
});

test('Evaluate complex expression', () => {
  const tokens = parse('(3 * 4 / 2)/((2/3) * 3.5 / (3.0))');
  const value = evaluate(tokens);
  expect(value.toPrecision(14)).toBe('7.7142857142857');
});

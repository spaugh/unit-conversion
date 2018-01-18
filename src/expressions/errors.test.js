const errors = require('./errors');

test('Errors properly throw', () => {
  expect(() => { throw new errors.PrecisionError() }).toThrow(errors.PrecisionError);
  expect(() => { throw new errors.InvalidExpression() }).toThrow(errors.InvalidExpression);
  expect(() => { throw new errors.UnbalancedParentheses() }).toThrow(errors.UnbalancedParentheses);
  expect(() => { throw new errors.UnsupportedOperator() }).toThrow(errors.UnsupportedOperator);
  expect(() => { throw new errors.UnsupportedUnit() }).toThrow(errors.UnsupportedUnit);
});

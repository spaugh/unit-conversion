const { tokenize, evaluateTokenizedExpression } = require('../expressions');

const { LeftBracketToken, RightBracketToken, OperatorToken, NumberToken, UnitToken } = require('../expressions/token');

test('tokenize simple expression', () => {
  const tokens = tokenize('1 * 2');
  expect(tokens).toHaveLength(3);
  expect(tokens[0]).toBeInstanceOf(NumberToken);
  expect(tokens[1]).toBeInstanceOf(OperatorToken);
  expect(tokens[2]).toBeInstanceOf(NumberToken);
});

test('tokenize complex expression', () => {
  const expectedTypes = [
    ['(', LeftBracketToken],
    [1,   NumberToken],
    ['*', OperatorToken],
    [2,   NumberToken],
    ['/', OperatorToken],
    [3,   NumberToken],
    [')', RightBracketToken],
    ['*', OperatorToken],
    ['(', LeftBracketToken],
    ['(', LeftBracketToken],
    [4,   NumberToken],
    ['*', OperatorToken],
    [5,   NumberToken],
    [')', RightBracketToken],
    ['/', OperatorToken],
    ['(', LeftBracketToken],
    [3,   NumberToken],
    ['/', OperatorToken],
    [2,   NumberToken],
    [')', RightBracketToken],
    [')', RightBracketToken],
  ]
  const expression = expectedTypes.map(k => k[0]).join('');
  const tokens = tokenize(expression);
  expect(tokens).toHaveLength(expectedTypes.length);
  for (let [index, token] of tokens.entries()) {
    expect(token).toBeInstanceOf(expectedTypes[index][1]);
  }
  expect(tokens.map(t => t.asString()).join('')).toEqual(expression);
});

test('tokenize simple unit expression', () => {
  const tokens = tokenize('meters/second');
  expect(tokens).toHaveLength(3);
  expect(tokens[0]).toBeInstanceOf(UnitToken);
  expect(tokens[1]).toBeInstanceOf(OperatorToken);
  expect(tokens[2]).toBeInstanceOf(UnitToken);
});

test('tokenize complex unit expression', () => {
  const tokens = tokenize('((meters*hectares)/((second/hectare)))');
  expect(tokens).toHaveLength(15);
  expect(tokens[0]).toBeInstanceOf(LeftBracketToken);
  expect(tokens[1]).toBeInstanceOf(LeftBracketToken);
  expect(tokens[2]).toBeInstanceOf(UnitToken);
  expect(tokens[3]).toBeInstanceOf(OperatorToken);
  expect(tokens[4]).toBeInstanceOf(UnitToken);
  expect(tokens[5]).toBeInstanceOf(RightBracketToken);
  expect(tokens[6]).toBeInstanceOf(OperatorToken);
  expect(tokens[7]).toBeInstanceOf(LeftBracketToken);
  expect(tokens[8]).toBeInstanceOf(LeftBracketToken);
  expect(tokens[9]).toBeInstanceOf(UnitToken);
  expect(tokens[10]).toBeInstanceOf(OperatorToken);
  expect(tokens[11]).toBeInstanceOf(UnitToken);
  expect(tokens[12]).toBeInstanceOf(RightBracketToken);
  expect(tokens[13]).toBeInstanceOf(RightBracketToken);
  expect(tokens[14]).toBeInstanceOf(RightBracketToken);
});

test('Evaluate simple expression', () => {
  const tokens = tokenize('2 * 3');
  const value = evaluateTokenizedExpression(tokens);
  expect(parseInt(value)).toBe(6);
});

test('Evaluate complex expression', () => {
  const tokens = tokenize('(3 * 4 / 2)/((2/3) * 3.5 / (3.0))');
  const value = evaluateTokenizedExpression(tokens);
  expect(value.toPrecision(14)).toBe('7.7142857142857');
});

test('Evaluate simple unit expression', () => {
  const tokens = tokenize('degree/minute');
  const conversionFactor = evaluateTokenizedExpression(tokens).toPrecision(14);
  const newExpression = tokens.map(token => token.asString()).join('');
  expect(conversionFactor).toBe('0.00029088820866572');
  expect(newExpression).toBe('rad/s');
});

test('Evaluate complex unit expression', () => {
  const tokens = tokenize('(tonnes)/(litre*day)');
  const conversionFactor = evaluateTokenizedExpression(tokens).toPrecision(14);
  const newExpression = tokens.map(token => token.asString()).join('');
  expect(conversionFactor).toBe('11.574074074074');
  expect(newExpression).toBe('(kg)/(m*m*m*s)'); // Is this the right behavior?
});

// This block of "unsupported" tests include functionality that could be later supported
test('tokenize expression with unsupported "-" operator', () => {
  expect(() => tokenize('1 - 2')).toThrow();
});

test('tokenize expression with unsupported "+" operator', () => {
  expect(() => tokenize('1 + 2')).toThrow();
});

test('tokenize expression with unsupported "^" operator', () => {
  expect(() => tokenize('1 ^ 2')).toThrow();
});

test('tokenize expression with unknown variables', () => {
  expect(() => tokenize('x + y')).toThrow();
});


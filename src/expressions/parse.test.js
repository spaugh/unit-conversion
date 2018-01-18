const parse = require('./parse');
const TokenTypes = require('./tokens');

test('parse simple expression', () => {
  const tokens = parse('1 * 2');
  expect(tokens).toHaveLength(3);
  expect(tokens[0]).toBeInstanceOf(TokenTypes.NumberToken);
  expect(tokens[1]).toBeInstanceOf(TokenTypes.OperatorToken);
  expect(tokens[2]).toBeInstanceOf(TokenTypes.NumberToken);
});

test('parse complex expression', () => {
  const expectedTypes = [
    ['(', TokenTypes.LeftBracketToken],
    [1,   TokenTypes.NumberToken],
    ['*', TokenTypes.OperatorToken],
    [2,   TokenTypes.NumberToken],
    ['/', TokenTypes.OperatorToken],
    [3,   TokenTypes.NumberToken],
    [')', TokenTypes.RightBracketToken],
    ['*', TokenTypes.OperatorToken],
    ['(', TokenTypes.LeftBracketToken],
    ['(', TokenTypes.LeftBracketToken],
    [4,   TokenTypes.NumberToken],
    ['*', TokenTypes.OperatorToken],
    [5,   TokenTypes.NumberToken],
    [')', TokenTypes.RightBracketToken],
    ['/', TokenTypes.OperatorToken],
    ['(', TokenTypes.LeftBracketToken],
    [3,   TokenTypes.NumberToken],
    ['/', TokenTypes.OperatorToken],
    [2,   TokenTypes.NumberToken],
    [')', TokenTypes.RightBracketToken],
    [')', TokenTypes.RightBracketToken],
  ]
  const expression = expectedTypes.map(k => k[0]).join('');
  const tokens = parse(expression);
  expect(tokens).toHaveLength(expectedTypes.length);
  for (let [index, token] of tokens.entries()) {
    expect(token).toBeInstanceOf(expectedTypes[index][1]);
  }
  expect(tokens.join('')).toEqual(expression);
});

test('parse simple unit expression', () => {
  const tokens = parse('meters/second');
  expect(tokens).toHaveLength(3);
  expect(tokens[0]).toBeInstanceOf(TokenTypes.UnitToken);
  expect(tokens[1]).toBeInstanceOf(TokenTypes.OperatorToken);
  expect(tokens[2]).toBeInstanceOf(TokenTypes.UnitToken);
});

test('parse complex unit expression', () => {
  const tokens = parse('((meters*hectares)/((second/hectare)))');
  expect(tokens).toHaveLength(15);
  expect(tokens[0]).toBeInstanceOf(TokenTypes.LeftBracketToken);
  expect(tokens[1]).toBeInstanceOf(TokenTypes.LeftBracketToken);
  expect(tokens[2]).toBeInstanceOf(TokenTypes.UnitToken);
  expect(tokens[3]).toBeInstanceOf(TokenTypes.OperatorToken);
  expect(tokens[4]).toBeInstanceOf(TokenTypes.UnitToken);
  expect(tokens[5]).toBeInstanceOf(TokenTypes.RightBracketToken);
  expect(tokens[6]).toBeInstanceOf(TokenTypes.OperatorToken);
  expect(tokens[7]).toBeInstanceOf(TokenTypes.LeftBracketToken);
  expect(tokens[8]).toBeInstanceOf(TokenTypes.LeftBracketToken);
  expect(tokens[9]).toBeInstanceOf(TokenTypes.UnitToken);
  expect(tokens[10]).toBeInstanceOf(TokenTypes.OperatorToken);
  expect(tokens[11]).toBeInstanceOf(TokenTypes.UnitToken);
  expect(tokens[12]).toBeInstanceOf(TokenTypes.RightBracketToken);
  expect(tokens[13]).toBeInstanceOf(TokenTypes.RightBracketToken);
  expect(tokens[14]).toBeInstanceOf(TokenTypes.RightBracketToken);
});

// This block of "unsupported" tests include functionality that could be later supported
test('parse expression with unsupported "-" operator', () => {
  expect(() => parse('1 - 2')).toThrow();
});

test('parse expression with unsupported "+" operator', () => {
  expect(() => parse('1 + 2')).toThrow();
});

test('parse expression with unsupported "^" operator', () => {
  expect(() => parse('1 ^ 2')).toThrow();
});

test('parse expression with unknown variables', () => {
  expect(() => parse('x + y')).toThrow();
});


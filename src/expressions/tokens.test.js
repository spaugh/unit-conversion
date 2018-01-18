const TokenTypes = require('./tokens');

test('instantiation and stringification for all token types', () => {
  const left = new TokenTypes.LeftBracketToken();
  const right = new TokenTypes.RightBracketToken();
  const multiply = new TokenTypes.OperatorToken('*');
  const divide = new TokenTypes.OperatorToken('/');
  const two = new TokenTypes.NumberToken(2);
  const three = new TokenTypes.NumberToken(3);
  const arcsecond = new TokenTypes.UnitToken('second');
  
  expect(left).toBeInstanceOf(TokenTypes.LeftBracketToken);
  expect(left.toString()).toBe('(');

  expect(right).toBeInstanceOf(TokenTypes.RightBracketToken);
  expect(right.toString()).toBe(')');
  
  expect(multiply).toBeInstanceOf(TokenTypes.OperatorToken);
  expect(multiply.toString()).toBe('*');
  expect(multiply.execute(two, three).toPrecision(1)).toBe('6');
  
  expect(divide).toBeInstanceOf(TokenTypes.OperatorToken);
  expect(divide.toString()).toBe('/');
  expect(divide.execute(two, three).toPrecision(1)).toBe('0.7');

  expect(arcsecond).toBeInstanceOf(TokenTypes.UnitToken);
  expect(arcsecond.toString()).toBe('″');
  expect(arcsecond.toNumber().toPrecision(28)).toBe('0.000004848136811095359935899141024');
});

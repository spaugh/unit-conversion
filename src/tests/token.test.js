const { LeftBracketToken, RightBracketToken, OperatorToken, UnitToken, NumberToken } = require('../expressions/token');

test('instantiating all token types', () => {
  const left = new LeftBracketToken();
  const right = new RightBracketToken();
  const multiply = new OperatorToken('*');
  const divide = new OperatorToken('/');
  const two = new NumberToken(2);
  const three = new NumberToken(3);
  const arcsecond = new UnitToken('second');
  
  expect(left).toBeInstanceOf(LeftBracketToken);
  expect(right).toBeInstanceOf(RightBracketToken);
  
  expect(multiply).toBeInstanceOf(OperatorToken);
  expect(multiply.execute(two, three).toPrecision(1)).toBe('6');
  
  expect(divide).toBeInstanceOf(OperatorToken);
  expect(divide.execute(two, three).toPrecision(1)).toBe('0.7');

  expect(arcsecond).toBeInstanceOf(UnitToken);
  expect(arcsecond.asNumber().toPrecision(28)).toBe('0.000004848136811095359935899141024');
});

//test('all unit conversion factors', () => {
 
//});

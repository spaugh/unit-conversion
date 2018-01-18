const { convertToSI } = require('./convert'); 

test('Convert simple unit expression', () => {
  const { expression, conversionFactor } = convertToSI('degree/minute');
  expect(expression).toBe('rad/s');
  expect(conversionFactor.toPrecision(14)).toBe('0.00029088820866572');
});

test('Evaluate complex unit expression', () => {
  const { expression, conversionFactor } = convertToSI('((tonnes)/(litre*day))');
  expect(conversionFactor.toPrecision(14)).toBe('11.574074074074');
  expect(expression).toBe('((kg)/(m*m*m*s))'); 
});

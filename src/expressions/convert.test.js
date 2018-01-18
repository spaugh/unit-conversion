const { convertToSI } = require('./convert'); 
const { InvalidExpression } = require('./errors');

test('Convert single unit', () => {
  const { expression, conversionFactor } = convertToSI('minute');
  expect(expression).toBe('s');
  expect(conversionFactor.toPrecision(14)).toBe('60.000000000000');
});

test('Convert arcsecond', () => {
  const { expression, conversionFactor } = convertToSI('second');
  expect(expression).toBe('rad');
  expect(conversionFactor.toPrecision(14)).toBe('0.0000048481368110954');
});

test('Convert arcsecond from symbol', () => {
  const { expression, conversionFactor } = convertToSI('″');
  expect(expression).toBe('rad');
  expect(conversionFactor.toPrecision(14)).toBe('0.0000048481368110954');
});

test('Convert arcsecond from alternate symbol', () => {
  const { expression, conversionFactor } = convertToSI('“');
  expect(expression).toBe('rad');
  expect(conversionFactor.toPrecision(14)).toBe('0.0000048481368110954');
});

test('Convert arcsecond from ascii', () => {
  const { expression, conversionFactor } = convertToSI('"');
  expect(expression).toBe('rad');
  expect(conversionFactor.toPrecision(14)).toBe('0.0000048481368110954');
});

test('Convert arcminute from symbol', () => {
  const { expression, conversionFactor } = convertToSI('′');
  expect(expression).toBe('rad');
  expect(conversionFactor.toPrecision(14)).toBe('0.00029088820866572');
});

test('Convert arcminute from alternate symbol', () => {
  const { expression, conversionFactor } = convertToSI('‘');
  expect(expression).toBe('rad');
  expect(conversionFactor.toPrecision(14)).toBe('0.00029088820866572');
});

test('Convert arcminute from ascii', () => {
  const { expression, conversionFactor } = convertToSI('\'');
  expect(expression).toBe('rad');
  expect(conversionFactor.toPrecision(14)).toBe('0.00029088820866572');
});

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

test('Convert nonsensical expression', () => {
  expect(() => convertToSI('hectare   minute')).toThrow(InvalidExpression);
});

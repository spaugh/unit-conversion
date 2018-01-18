const { BASE_UNITS, unitDefinitions } = require('./definitions');

test('all unit conversion factors', () => {
  for (const unit of BASE_UNITS) {
    expect(unit.conversionFactor.toPrecision(3)).toBe('1.00');
  }
  const minute = unitDefinitions.get('minute');
  const hour = unitDefinitions.get('hour');
  const day = unitDefinitions.get('day');
  const litre = unitDefinitions.get('litre');
  const hectare = unitDefinitions.get('hectare');
  const tonne = unitDefinitions.get('tonne');
  const degree = unitDefinitions.get('degree');
  const arcminute = unitDefinitions.get('arcminute');
  const arcsecond = unitDefinitions.get('arcsecond');
  expect(minute.conversionFactor.toPrecision(20)).toBe('60.000000000000000000');
  expect(hour.conversionFactor.toPrecision(20)).toBe('3600.0000000000000000');
  expect(day.conversionFactor.toPrecision(20)).toBe('86400.000000000000000');
  expect(litre.conversionFactor.toPrecision(20)).toBe('0.0010000000000000000000');
  expect(hectare.conversionFactor.toPrecision(20)).toBe('10000.000000000000000');
  expect(tonne.conversionFactor.toPrecision(20)).toBe('1000.0000000000000000');
  expect(degree.conversionFactor.toPrecision(20)).toBe('0.017453292519943295769');
  expect(arcminute.conversionFactor.toPrecision(20)).toBe('0.00029088820866572159615');
  expect(arcsecond.conversionFactor.toPrecision(20)).toBe('0.0000048481368110953599359');
});

test('"second" refers to arcsecond, rather than time', () => {
  const arcsecond = unitDefinitions.get('second');
  expect(arcsecond.symbol).toBe('″');
});

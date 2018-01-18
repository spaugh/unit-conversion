const { BASE_UNITS, unitDefinitions } = require('./definitions');

test('all unit conversion factors', () => {
  for (let unit of BASE_UNITS) {
    expect(unit.conversionFactor.toPrecision(3)).toBe('1.00');
  }
  let minute = unitDefinitions.get('minute');
  let hour = unitDefinitions.get('hour');
  let day = unitDefinitions.get('day');
  let litre = unitDefinitions.get('litre');
  let hectare = unitDefinitions.get('hectare');
  let tonne = unitDefinitions.get('tonne');
  let degree = unitDefinitions.get('degree');
  let arcminute = unitDefinitions.get('arcminute');
  let arcsecond = unitDefinitions.get('arcsecond');
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
  let arcsecond = unitDefinitions.get('second');
  expect(arcsecond.symbol).toBe('″');
});

require('./utils').setPrecision();

const Decimal = require('decimal.js');

const { BaseUnit, ApprovedUnit } = require('./units');
const { buildMap } = require('./utils');

const Pi = Decimal.acos(-1); // Allows precision up to 1000 digits

// Base Units, per https://en.wikipedia.org/wiki/SI_base_unit
// Limited to those specifically listed in the challenge prompt.
// Additionally, for simplicity, the radian unit is treated as
// a base unit, despite actually being an SI derived unit of m/m
const meter = new BaseUnit('meter', 'm', 'length');
const kilogram = new BaseUnit('kilogram', 'kg', 'mass');
const second = new BaseUnit('second', 's', 'time', ['sec']);
const radian = new BaseUnit('radian', 'rad', 'angle');
const BASE_UNITS = [ meter, kilogram, second, radian ];

// Non-SI units accepted for SI usage, per https://en.wikipedia.org/wiki/Non-SI_units_mentioned_in_the_SI
// Limited to those specifically listed in the challenge prompt.
const APPROVED_UNITS = [
  new ApprovedUnit('minute', 'min', 'time', new Decimal(60), [ second ]),
  new ApprovedUnit('hour', 'h', 'time', new Decimal(3600), [ second ], ['hr']),
  new ApprovedUnit('day', 'd', 'time', new Decimal(86400), [ second ]),
  new ApprovedUnit('litre', 'L', 'volume', new Decimal(0.001), [ meter, meter, meter ], ['liter', 'ltr']),
  new ApprovedUnit('hectare', 'ha', 'area', new Decimal(10000), [ meter, meter ]),
  new ApprovedUnit('tonne', 't', 'mass', new Decimal(1000), [ kilogram ], ['metric ton']),
  new ApprovedUnit('degree', '°', 'angle', Pi.dividedBy(new Decimal(180)), [ radian ], ['deg']),
  new ApprovedUnit('arcminute', '′', 'angle', Pi.dividedBy(new Decimal(10800)), [ radian ], ['\'', 'arcmin', 'amin']),
  // NOTE: The use of "second" to denote arcsecond is nonstandard, but it is used in accordance with the challenge prompt
  new ApprovedUnit('arcsecond', '″', 'angle', Pi.dividedBy(new Decimal(648000)), [ radian ], ['"', 'second', 'arcsec', 'asec']),
];

const keyFn = (unit) => Array.from(unit.spellings);
// We want approved units to override base units, especially for the arcsecond/second case
module.exports = { APPROVED_UNITS, BASE_UNITS, unitDefinitions: buildMap(BASE_UNITS.concat(APPROVED_UNITS), keyFn) };

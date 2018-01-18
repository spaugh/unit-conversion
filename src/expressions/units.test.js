const { BaseUnit, ApprovedUnit } = require('./units');

test('Base unit instantiation', () => {
  const bloit = new BaseUnit('bloit', 'blt', 'length');
  expect(bloit).toBeInstanceOf(BaseUnit);
  expect(Array.from(bloit.spellings)).toContain('bloits');
});

test('Unit spelling generation', () => {
  const bloit = new BaseUnit('bloit', 'blt', 'length');
  const gloop = new ApprovedUnit('gloop', '"', 'length', 1234.1234, [ bloit ]);
  expect(Array.from(gloop.spellings)).not.toContain('"s')
});

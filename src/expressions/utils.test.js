const { buildMap, setPrecision } = require('./utils');

test('setting precision', () => {
  process.env.MAX_PRECISION = 342;
  setPrecision();
  expect(require('decimal.js').precision).toBe(342);
});

test('building a simple map', () => {
  const list = [
    { foo: 1, bar: 'baz' },
    { foo: 2, bar: 'qux' },
    { foo: 1234, bar: 'quux' },
  ];
  const map = buildMap(list, item => item.bar);
  expect(map.get('baz').foo).toBe(1);
  expect(map.get('qux').foo).toBe(2);
  expect(map.get('quux').foo).toBe(1234);
});

test('building a many to one map', () => {
  const people = [
    { name: 'Andrew', nicknames: ['spaugh'], height: 74 },
    { name: 'Stephen', nicknames: ['steve', 'steven'], height: 70 },
    { name: 'Gary', nicknames: ['garebare'], height: 70 },
    { name: 'Alex', nicknames: ['AK'], height: 67 },
  ]
  const keyFn = person => person.nicknames.concat([ person.name ]);
  const map = buildMap(people, keyFn);
  expect(map.get('Andrew').name).toBe('Andrew');
  expect(map.get('spaugh').name).toBe('Andrew');
  expect(map.get('Stephen').name).toBe('Stephen');
  expect(map.get('steve').name).toBe('Stephen');
  expect(map.get('steven').name).toBe('Stephen');
  expect(map.get('Alex').name).toBe('Alex');
  expect(map.get('AK').name).toBe('Alex');
  expect(map.get('Gary').name).toBe('Gary');
  expect(map.get('garebare').name).toBe('Gary');
});

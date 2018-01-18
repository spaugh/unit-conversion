const request = require('supertest');
const { server } = require('./app');

afterEach(() => server.close());

test('unit conversion route', async () => {
  const response = await request(server).get('/units/si?units=degree/minute');
  expect(response.status).toEqual(200);
  expect(response.type).toEqual('application/json');
  expect(response.body).toEqual({
    unit_name: 'rad/s',
    multiplication_factor: 0.00029088820866572
  });
});

test('unsupported unit', async () => {
  const response = await request(server).get('/units/si?units=gloop/minute');
  expect(response.status).toEqual(400);
  expect(response.type).toEqual('application/json');
  expect(response.body).toEqual({
    error: expect.stringMatching(new RegExp('unsupported unit', 'i'))
  });
});

test('unsupported operator', async () => {
  const response = await request(server).get('/units/si?units=hectare%2Bminute');
  expect(response.status).toEqual(400);
  expect(response.type).toEqual('application/json');
  expect(response.body).toEqual({
    error: expect.stringMatching(new RegExp('unsupported operator', 'i'))
  });
});

test('invalid expression', async () => {
  const response = await request(server).get('/units/si?units=hectare%20minute');
  expect(response.status).toEqual(400);
  expect(response.type).toEqual('application/json');
  expect(response.body).toEqual({
    error: expect.stringMatching(new RegExp('invalid expression', 'i'))
  });
});

test('unbalanced parentheses', async () => {
  const response = await request(server).get('/units/si?units=(hectare/minute))');
  expect(response.status).toEqual(400);
  expect(response.type).toEqual('application/json');
  expect(response.body).toEqual({
    error: expect.stringMatching(new RegExp('unbalanced parentheses', 'i'))
  });
});

test('precision for simple conversion', async () => {
  const response = await request(server).get('/units/si?units=degree/minute');
  expect(response.body.multiplication_factor).not.toBeInstanceOf(String);
  expect(response.body.multiplication_factor.toString()).toBe('0.00029088820866572');
});

test('precision for complex conversion', async () => {
  const response = await request(server).get('/units/si?units=((tonnes)/(litre*day))');
  expect(response.body.multiplication_factor).not.toBeInstanceOf(String);
  expect(response.body.multiplication_factor.toString()).toBe('11.574074074074');
});

test('many requests', async () => {
  const responses = [];
  [...Array(500)].forEach(async () => {
    const response = await request(server).get('/units/si?units=degree/minute');
    responses.push(response);
  });
  for (const response of responses) {
    expect(response.status).toEqual(200);
  }
});

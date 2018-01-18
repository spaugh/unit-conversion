const request = require('supertest');
const server = require('./app');

afterEach(() => server.close());

test('unit conversion route', async () => {
  const response = await request(server).get('/units/si?units=degree/minute');
  expect(response.status).toEqual(200)
  expect(response.type).toEqual('application/json')
  expect(response.body).toEqual({
    unit_name: 'rad/s',
    multiplication_factor: 0.00029088820866572
  });
})


const { createResponse } = require('../server/models/responseModel');

const defaultResponse = { actionSuccess: true, statusCode: 200, message: '', data: {} };

test('returns a default response', () => {
  expect(createResponse(true)).toBe(defaultResponse);
});
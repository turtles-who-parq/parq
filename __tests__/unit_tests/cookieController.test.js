require('dotenv').config();
const cookieController = require('../../Application/server/controllers/cookieController');
const generateAuthToken = require('../../Application/server/controllers/cookieController');
const path = require('path');

describe('Unit tests for cookieController', () => {

  beforeEach(() => {
    const authToken = generateAuthToken('Mike Grant');
    const req = {
      body: {
        username: 'Mike Grant',
      },
      headers: {
        authorization: `Bearer ${authToken}`
      }
    };
    const res = {};
  })

  describe('Tests for setCookie', () => {
    it('Username should be defined', () => {
      cookieController.setCookie(req, res, next);
      expect(res.locals.access_token).toBeDefined();
    })
  });

});
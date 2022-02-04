const controller = require('../server/controllers/controller');

describe('controller unit test', () => {
  beforeEach((done) => {
    const testReq = {};
    const testRes;
    testRes.locals.userFavorites = [{places_id : '97-KvAlzGxT14XqIGQFECQ'}];
    const testNext = jest.fn();
    done();
  });

  describe('testing controller.getBusinessInfo method', () => {
    it('', () => {
      const result = controller.getBusinessInfo(req, res, next);
    })
  })
})
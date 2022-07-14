const { expect } = require('chai');
const sinon = require('sinon');
const salesMock = require('../mocks/salesMock');
const SalesController = require('../../../controllers/sales');
const SalesService = require('../../../services/sales');
const ProductsService = require('../../../services/productsServices');

describe('SalesController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#salesAll', () => {
    it('responde com o status 200', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'salesAll').resolves(salesMock);

      await SalesController.salesAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('responde com um array de objetos', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'salesAll').resolves(salesMock);

      await SalesController.salesAll(req, res);

      const funcArg = res.json.args[0][0];

      expect(funcArg).to.be.an('array')
        .and.to.deep.equal(salesMock);
    });
  });

  describe('#findById', () => {
    it('responde com o status 200', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      const expectedArr = salesMock.slice(0, 2).map((s) => ({
        date: s.date, productId: s.productId, quantity: s.quantity,
      }));

      sinon.stub(SalesService, 'findById').resolves(expectedArr);

      await SalesController.findById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('responde com um array de objetos', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      const expectedArr = salesMock.slice(0, 2).map((s) => ({
        date: s.date, productId: s.productId, quantity: s.quantity,
      }));

      sinon.stub(SalesService, 'findById').resolves(expectedArr);

      await SalesController.findById(req, res);

      const funcArg = res.json.args[0][0];

      expect(funcArg).to.be.an('array')
        .and.to.deep.equal(expectedArr);
    });
  });
});

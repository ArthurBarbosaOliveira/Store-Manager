const { expect } = require('chai');
const sinon = require('sinon');

const salesMock = require('../mocks/salesMock');
const db = require('../../../models/connection');
const SalesModel = require('../../../models/sales');

describe('SalesModel', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#salesAll', () => {
    it('retorna um array de objetos', async () => {
      sinon.stub(db, 'query').resolves([salesMock]);

      const sales = await SalesModel.salesAll();

      expect(sales).to.be.an('array')
        .and.to.deep.equal(salesMock);
    });
  });

  describe('#findById', () => {
    it('retorna um array de objetos sem id', async () => {
      sinon.stub(db, 'query').resolves([salesMock.slice(0, 2).map((s) => ({
        date: s.date, productId: s.productId, quantity: s.quantity,
      }))]);

      const sales = await SalesModel.findById();

      expect(sales).to.be.an('array');

      sales.forEach((sale) => {
        expect(sale).to.be.an('object');
        expect(sale).not.to.have.property('saleId');
        expect(sale).to.have.property('date');
        expect(sale).to.have.property('productId');
        expect(sale).to.have.property('quantity');
      });
    });
  });
});


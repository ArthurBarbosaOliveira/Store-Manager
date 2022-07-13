const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const { productsList, productById } = require('../mocks/productsMock');

describe('productsModel', () => {
  beforeEach(sinon.restore);

  describe('#productAll', () => {
    it('deve retornar todos os produtos', async () => {
      sinon.stub(db, 'query').resolves([productsList]);

      const results = await productsModel.productAll();

      expect(results).to.be.eq(productsList);
    });
  });

  describe('#productById', () => {
    it('deve retornar o produto correspondente ao id', async () => {
      sinon.stub(db, 'query').resolves([productById]);

      const results = await productsModel.productById(1);

      expect(results).to.be.eq(productById[0]);
    });

    it('deve retornar "undefined" ao não encontrar um produto correspondente ao id', async () => {
      sinon.stub(db, 'query').resolves([[undefined]]);

      const results = await productsModel.productById(1)

      expect(results).to.be.equal(undefined);
    });
  });
});

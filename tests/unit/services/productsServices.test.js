const NotFoundError = require('../../../middlewares/errors');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsServices');
const sinon = require('sinon');
const { expect } = require('chai');

describe('productsService', () => {
  beforeEach(() => {
    sinon.restore();
  })

  describe('#productAll', () => {
    it('Através do caminho /products, todos os produtos devem ser retornados;', async () => {
      sinon.stub(productsModel, 'productAll').resolves();
      const product = await productsService.productAll();
      expect(product).to.be.eq();
    })
  });
  describe('#productById', (id) => {
    it('Se o produto for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http 404;', async () => {
      sinon.stub(productsModel, 'productById').resolves('Product not found');
      const product = await productsService.productById(id);
      expect(product).to.throws('Product not found');
    })
  });
});

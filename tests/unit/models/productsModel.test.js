const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');
const sinon = require('sinon');
const { expect } = require('chai');

describe('productsModel', () => {
  beforeEach(() => {
    sinon.restore();
  })
  
  describe('#productAll', () => {
    it('Através do caminho /products, todos os produtos devem ser retornados;', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const productsAll = await productsModel.productAll()
      expect(productsAll).to.be.eq();
    })
  });
  describe('#productById', (id) => {
    it('Através do caminho /products/:id, apenas o produto com o id presente na URL deve ser retornado;', async () => {
      sinon.stub(connection, 'execute').resolves([{ id }]);
      const productsById = await productsModel.productById({ id });
      expect(productsById).to.be.eq(id);
    })
  });
});

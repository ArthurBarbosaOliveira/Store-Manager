const { expect, use } = require('chai');
const sinon = require('sinon');

const db = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');
const { productsList, productId } = require('../mocks/productsMock');

describe('ProductsModel', () => {
  beforeEach(sinon.restore);

  describe('#productAll', () => {
    it('deve retornar todos os produtos', async () => {
      sinon.stub(db, 'query').resolves([productsList]);

      const response = await ProductsModel.productAll();
      
      expect(response).to.be.eq(productsList);
    });
  });

  describe('#productById', () => {
    it('deve retornar o produto correspondente ao id', async () => {
      sinon.stub(db, 'query').resolves([productId]);

      const VALID_ID = 1;
      const response = await ProductsModel.productById(VALID_ID);

      expect(response).to.be.an('object');
      expect(response).to.have.all.keys('id', 'name');
      expect(response).to.be.eq(productId);
    });

    it('deve retornar "undefined" ao não encontrar um produto correspondente ao id', async () => {
      sinon.stub(db, 'query').resolves([[undefined]]);

      const INVALID_ID = 1;
      const response = await ProductsModel.productById(INVALID_ID);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('#create', () => {
    it('deve retornar objeto contendo o "insertId" e "affectedRows", gerados automaticamente', async () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1, affectedRows: 1 }]);

      const name = 'ProdutoX';
      const response = await ProductsModel.create(name);

      expect(response).to.be.an('object');
      expect(response).to.have.property('insertId', 1);
      expect(response).to.have.property('affectedRows', 1);
    });
  });

  describe('#update', () => {
    it('deve retornar objeto contendo "affectedRows", gerado automaticamente', async () => {
      sinon.stub(db, 'query').resolves([{ affectedRows: 1 }]);

      const id = 1;
      const name = 'Martelo do Batman';
      const response = await ProductsModel.update(id, name);

      expect(response).to.be.an('object');
      expect(response).to.have.property('affectedRows', 1);
    });
  });

  describe('#remove', () => {
    it('deve retornar objeto contendo o "insertId", gerado automaticamente', async () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1, affectedRows: 1 }]);

      const id = 1;
      const response = await ProductsModel.remove(id);

      expect(response).to.be.an('object');
      expect(response).to.have.property('affectedRows', 1);
    });
  });
}); 

const { expect, use } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');
const { productsList, productById,} = require('../../../mock/mockProduct');

escribe('productsModel', () => {
  beforeEach(sinon.restore);

  describe('#getAll', () => {
    it('deve retornar todos os produtos', async () => {
      sinon.stub(connection, 'query').resolves([productsList]);

      const response = await productsModel.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.equal(productsList);
    });
  });

  describe('#findById', () => {
    it('deve retornar o produto correspondente ao id', async () => {
      sinon.stub(connection, 'query').resolves([[productById]]);

      const VALID_ID = 1;
      const response = await productsModel.findById(VALID_ID);

      expect(response).to.be.an('object');
      expect(response).to.have.all.keys('id', 'name');
      expect(response).to.be.equal(productById);
    });

    it('deve retornar "undefined" ao não encontrar um produto correspondente ao id', async () => {
      sinon.stub(connection, 'query').resolves([[undefined]]);

      const INVALID_ID = 1;
      const response = await productsModel.findById(INVALID_ID);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('#create', () => {
    it('deve retornar objeto contendo o "insertId" e "affectedRows", gerados automaticamente', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1, affectedRows: 1 }]);

      const name = 'ProdutoX';
      const response = await productsModel.create(name);

      expect(response).to.be.an('object');
      expect(response).to.have.property('insertId', 1);
      expect(response).to.have.property('affectedRows', 1);
    });
  });
}); 
const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');


const ProductsModel = require('../../../models/productsModel');
const { productsList, productId, createdProduct, updatedProduct } = require('../mocks/productsMock');
const ProductsService = require('../../../services/productsServices');

const CustomError = require('../../../errors/CustomError');
const { NotFoundError } = require('../../../errors/errorProduct');
const { nameRequired, nameLength } = require('../../../errors/errorName');
const productsMock = require('../mocks/productsMock');

use(chaiAsPromised);

describe('ProductsService', () => {
  beforeEach(sinon.restore);

  describe('#productAll', () => {
    it('deve retornar todos os produtos', async () => {
      sinon.stub(ProductsModel, 'productAll').resolves(productsList);

      const response = await ProductsService.productAll();

      expect(response).to.be.an('array');
      expect(response).to.be.eq(productsList);
    });
  });

  describe('#productById', () => {
    it('deve retornar o produto correspondente ao id', async () => {
      sinon.stub(ProductsModel, 'productById').resolves(productId);

      const VALID_ID = 1;
      const response = await ProductsModel.productById(VALID_ID);

      expect(response).to.be.an('object');
      expect(response).to.have.all.keys('id', 'name');
      expect(response).to.be.equal(productId);
    });

    it('deve retornar um erro ao não encontrar um produto correspondente ao id', async () => {
      sinon.stub(ProductsModel, 'productById').resolves(undefined);

      const INVALID_ID = 1;

      try {
        await ProductsService.productById(INVALID_ID);
      } catch (error) {
        expect(error.code).to.be.equal(404);
        expect(error.message).to.be.equal(NotFoundError);
      };
    });
  });

  describe('#create', () => {
    it('deve retornar objeto contendo o novo produto registrado', async () => {
      sinon.stub(ProductsModel, 'create').resolves({ insertId: 1 });
      sinon.stub(ProductsModel, 'productById').resolves(createdProduct);

      const name = 'ProdutoX';
      const { insertId } = await ProductsModel.create(name);
      const response = await ProductsModel.productById(insertId);

      expect(insertId).to.be.equal(1);
      expect(response).to.have.property('id', 1);
      expect(response).to.have.property('name', name);
      expect(response).to.be.equal(createdProduct);
    });

    it('deve retornar erro ao receber um nome vazio', async () => {
      const INVALID_NAME = '';

      try {
        await ProductsService.create(INVALID_NAME);
      } catch (error) {
        expect(error.code).to.be.equal(400);
        expect(error.message).to.be.equal(nameRequired);
      };
    });

    it('deve retornar erro ao receber um nome inválido', async () => {
      const INVALID_NAME = '123';

      try {
        await ProductsService.create(INVALID_NAME);
      } catch (error) {
        expect(error.code).to.be.equal(422);
        expect(error.message).to.be.equal(nameLength);
      };
    });
  });

  describe('#update', () => {
    it('deve retornar o produto atualizado', async () => {
      sinon.stub(ProductsModel, 'update').resolves({ affectedRows: 1 });
      sinon.stub(ProductsModel, 'productById').resolves(updatedProduct);

      const id = 1;
      const name = 'Martelo do Batman';

      await ProductsModel.update(id, name);

      const response = await ProductsModel.productById(id);

      expect(response).to.be.an('object');
      expect(response).to.have.property('name', name);
      expect(response).to.have.equal(updatedProduct);
    });

    it('deve retornar erro ao tentar atualizar um produto inexistente', async () => {
      sinon.stub(ProductsModel, 'update').resolves({ affectedRows: 0 });

      const INVALID_ID = 1;
      const name = 'Martelo do Batman';

      await ProductsModel.update(INVALID_ID, name);

      try {
        await ProductsService.update(INVALID_ID, name);
      } catch (error) {
        expect(error.code).to.be.equal(404);
        expect(error.message).to.be.equal(NotFoundError);
      }
    });

    it('deve retornar erro ao receber um nome vazio', async () => {
      const id = 1;
      const INVALID_NAME = '';

      try {
        await ProductsService.update(id, INVALID_NAME);
      } catch (error) {
        expect(error.code).to.be.equal(400);
        expect(error.message).to.be.equal(nameRequired);
      };
    });

    it('deve retornar erro ao receber um nome inválido', async () => {
      const id = 1;
      const INVALID_NAME = '123';

      try {
        await ProductsService.update(id, INVALID_NAME);
      } catch (error) {
        expect(error.code).to.be.equal(422);
        expect(error.message).to.be.equal(nameLength);
      };
    });
  });

  describe('#remove', () => {
    it('deve verificar se é possível deletar um produto com id válido', async () => {
      sinon.stub(ProductsModel, 'remove').resolves({ affectedRows: 1 });
      const VALID_ID = 1;
      const response = await ProductsModel.remove(VALID_ID);

      expect(response).to.have.property('affectedRows', 1);
    });
    it('deve retornar erro ao tentar deletar um produto com id inválido', async () => {
      sinon.stub(ProductsModel, 'productAll').resolves(productsList);
      const INVALID_ID = 3;

      try {
        await ProductsService.remove(INVALID_ID);
      } catch (error) {
        expect(error.code).to.be.equal(404);
        expect(error.message).to.be.equal(NotFoundError);
      }
    });
  });
});  

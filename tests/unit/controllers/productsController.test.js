const { expect } = require('chai');
const sinon = require('sinon');

const ProductsControllers = require('../../../controllers/ProductsControllers');
const ProductsService = require('../../../services/productsServices');
const { productsList, productById, createdProduct, updatedProduct } = require('../mocks/productsMock');

describe('productsController', () => {
  beforeEach(sinon.restore);

  describe('#productAll', () => {
    it('deve retornar todos os produtos e o status 200', async () => {
      const request = {};
      const response = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();

      sinon.stub(ProductsService, 'productAll').resolves(productsList);

      await ProductsControllers.productAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(productsList)).to.be.equal(true);
    });
  });

  describe('#productById', () => {
    const request = {};
    const response = {};

    request.params = { id: 1 };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    it('deve retornar o produto correspondente ao id', async () => {
      sinon.stub(ProductsService, 'productById').resolves(productById);

      await ProductsControllers.productById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(productById)).to.be.equal(true);
    });
  });  

  describe('#create', () => {
    const request = {};
    const response = {};

    request.body = { name: 'ProdutoX' };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    it('será validado que é possível cadastrar um produto com sucesso e retorna status "201"', async () => {
      sinon.stub(ProductsService, 'create').resolves(createdProduct);

      await ProductsControllers.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(createdProduct)).to.be.equal(true);
    });
  });

  describe('#update', () => {
    const request = {};
    const response = {};

    request.params = { id: 1 };
    request.body = { name: 'Martelo do Batman' };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    it('será validado que é possível atualizar um produto com sucesso e retorna status "200"', async () => {
      sinon.stub(ProductsService, 'update').resolves(updatedProduct);

      await ProductsControllers.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(updatedProduct)).to.be.equal(true);
    });
  });

  describe('#remove', () => {
    const request = {};
    const response = {};

    request.params = { id: 1 };

    response.sendStatus = sinon.stub();

    it('será validado que é possível remover um produto com sucesso e retorna status "204"', async () => {
      sinon.stub(ProductsService, 'remove').resolves(true);

      await ProductsControllers.remove(request, response);
      expect(response.sendStatus.calledWith(204)).to.be.equal(true);
    });
  });
}); 

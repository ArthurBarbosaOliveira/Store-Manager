const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised')

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsServices');
const { productsList, productId } = require('../mocks/productsMock');

const CustomError = require('../../../errors/CustomError');

use(chaiAsPromised);

describe('productsService', () => {
  beforeEach(sinon.restore);

  describe('#getAll', () => {
    it('deve retornar todos os produtos', async () => {
      sinon.stub(productsModel, 'getAll').resolves(productsList);

      const results = await productsService.getAll();

      expect(results).to.be.eq(productsList);
    });
  });

  describe('#findById', () => {
    it('deve retornar o produto correspondente ao id', async () => {
      sinon.stub(productsModel, 'findById').resolves(productId[0]);

      const results = await productsModel.findById(1);

      expect(results).to.be.eq(productId[0]);
    });

    it('deve retornar um erro ao não encontrar um produto correspondente ao id', () => {
      sinon.stub(productsModel, 'findById').resolves(false);

      expect(productsService.findById(1)).to.be.rejectedWith(CustomError);
    });
  });
}); 

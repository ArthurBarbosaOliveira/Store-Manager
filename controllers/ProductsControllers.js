const ProductsService = require('../services/ProductsServices');

const ProductsController = {
  productAll: async (_request, response) => {
    const products = await ProductsService.listAll();
    return response.status(200).json(products);
  },
  productById: async (_request, response) => {
    const { id } = _request.params;
    const products = await ProductsService.productById(id);
    return response.status(200).json(products);
  },
};

module.exports = ProductsController;
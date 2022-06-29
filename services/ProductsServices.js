const NotFoundError = require('../middlewares/NotFoundError');
const ProductsModel = require('../models/ProductsModels');

const ProductsService = {  
  productAll: async () => {
    const products = await ProductsModel.productAll();
    return products;
  },
  productById: async (id) => {
    const products = await ProductsModel.productById(id);
    if (!products) throw new NotFoundError('Product not found');
    return products;
  },
};

module.exports = ProductsService; 
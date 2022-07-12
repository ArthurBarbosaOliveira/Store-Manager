const ProductsModel = require('../models/productsModel');

const productAll = async () => {
  const products = await ProductsModel.productAll();
  return products;
};

const productById = async (id) => {
  const products = await ProductsModel.productById(id);

  if (!products) {
    throw new Error('Product not found');
  }

  return products;
};

module.exports = {
  productAll,
  productById,
};
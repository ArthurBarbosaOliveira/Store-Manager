const productsService = require('../services/productsServices');

const productAll = async (_request, response) => {
  const products = await productsService.productAll();
  return response.status(200).json(products);
};

const productById = async (_request, response) => {
  const { id } = _request.params;
  const products = await productsService.productById(id);
  
  return response.status(200).json(products);
};

module.exports = {
  productAll,
  productById,
};
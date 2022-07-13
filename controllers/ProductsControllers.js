const productsService = require('../services/productsServices');

const create = async (_request, response) => {
  const { name } = _request.body;

  const products = await productsService.create(name);
  response.status(201).json(products);
};

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
  create,
};
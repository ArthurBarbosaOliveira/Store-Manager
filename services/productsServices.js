const ProductsModel = require('../models/productsModel');
const { NotFoundError } = require('../middlewares/errors');
const CustomError = require('../middlewares/customError');
const { nameRequired, nameLength } = require('../middlewares/errors');

const productAll = async () => {
  const products = await ProductsModel.productAll();
  return products;
};

const productById = async (id) => {
  const products = await ProductsModel.productById(id);
  
  if (!products) throw new CustomError(404, NotFoundError);
  
  return products;
};

const create = async (name) => {
  if (!name) throw new Error(nameRequired);
  if (name.length < 5) throw new Error(nameLength);
  const { insertId } = await ProductsModel.create(name);
  const products = await ProductsModel.productById(insertId);
  return products;
};

module.exports = {
  productAll,
  productById,
  create,
  
};
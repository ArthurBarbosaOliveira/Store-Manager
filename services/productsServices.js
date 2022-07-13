const ProductsModel = require('../models/productsModel');
const validateName = require('./validadores');
const { NotFoundError } = require('../middlewares/errors');
const CustomError = require('../middlewares/customError');

const create = async (name) => {
  validateName(name);
  const { insertId } = await ProductsModel.create(name);
  const products = await ProductsModel.productById(insertId);
  return products;
};

const productAll = async () => {
  const products = await ProductsModel.productAll();
  return products;
};

const productById = async (id) => {
  const products = await ProductsModel.productById(id);

  if (!products) throw new CustomError(404, NotFoundError);

  return products;
};

module.exports = {
  productAll,
  productById,
  create,

};
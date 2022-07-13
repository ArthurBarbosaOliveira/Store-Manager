const ProductsModel = require('../models/productsModel');
const { nameRequired, nameLength } = require('../middlewares/errors');
const { NotFoundError } = require('../middlewares/errors');

const create = async (name) => {
  if (!name) throw new Error(nameRequired);
  if (name.length < 5) throw new Error(nameLength);
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

  if (!products) throw new Error(NotFoundError);

  return products;
};

module.exports = {
  productAll,
  productById,
  create,

};
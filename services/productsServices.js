const ProductsModel = require('../models/productsModel');
const { NotFoundError } = require('../errors/errorProduct');
const { nameRequired, nameLength } = require('../errors/errorName');
const CustomError = require('../errors/CustomError');

const productAll = async () => {
  const products = await ProductsModel.productAll();
  return products;
};

const productById = async (id) => {
  const product = await ProductsModel.productById(id);

  if (!product) {
    throw new CustomError(404, NotFoundError);
  }

  return product;
};

const create = async (name) => {  
  if (!name) throw new CustomError(400, nameRequired);
  if (name.length < 5) throw new CustomError(422, nameLength);
  
  const { insertId } = await ProductsModel.create(name);
  const products = await ProductsModel.productById(insertId);
  return products;
};

const update = async (id, name) => {
  if (!name) throw new CustomError(400, nameRequired);
  if (name.length < 5) throw new CustomError(422, nameLength);

  const { affectedRows } = await ProductsModel.update(id, name);

  if (!affectedRows) throw new CustomError(404, NotFoundError);

  const products = await ProductsModel.productById(id);

  return products;
};

const remove = async (id) => {
  const all = await ProductsModel.productAll();
  const productsId = all.map((product) => product.id);

  if (!productsId.includes(Number(id))) throw new CustomError(404, NotFoundError);

  const { affectedRows } = await ProductsModel.remove(id);

  if (!affectedRows) throw new CustomError(404, NotFoundError);
};

module.exports = {
  productAll,
  productById,
  create,
  update,  
  remove,
};

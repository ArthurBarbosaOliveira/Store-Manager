const productsModel = require('../models/productsModel');
const salesModel = require('../models/sales');
const { validateSales } = require('./validadores');
const CustomError = require('../errors/CustomError');
const { saleNotFound } = require('../errors/errorSales');
const { NotFoundError } = require('../errors/errorProduct');

const registro = async (sales) => {
  validateSales(sales);

  const getAllProducts = await productsModel.productAll();
  const ProductsId = getAllProducts.map(({ id }) => id);

  sales.forEach(({ productId: id }) => {
    if (!ProductsId.includes(id)) throw new CustomError(404, NotFoundError);
  });

  const { insertId: id } = await salesModel.create();

  sales.forEach(({ productId, quantity }) => salesModel.registro(id, productId, quantity));

  return { id, itemsSold: sales };
};

const salesAll = async () => {
  const results = await salesModel.salesAll();

  const formart = results.map(
    ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    }),
  );

  return formart;
};

const findById = async (id) => {
  const sales = await salesModel.findById(id);

  if (!sales.length) throw new CustomError(404, saleNotFound);

  const formartId = sales.map(
    ({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }),
  );

  return formartId;
};

const remove = async (id) => {
  const sales = await salesModel.findById(id);

  if (!sales.length) throw new CustomError(404, saleNotFound);

  await salesModel.remove(id);
};

module.exports = {
  registro,
  salesAll,
  findById,
  remove,
}; 
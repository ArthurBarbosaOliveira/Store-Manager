const productsModel = require('../models/productsModel');
const salesModel = require('../models/sales');
const { validateSales } = require('./validadores');
const CustomError = require('../middlewares/customError');
const { NotFoundError } = require('../middlewares/errors');

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

module.exports = {
  registro,
}; 
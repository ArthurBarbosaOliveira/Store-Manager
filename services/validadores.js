const CustomError = require('../middlewares/customError');
const { productIdRequired, productQuantityRequired,
  productQuantityNotZero } = require('../middlewares/errors');

const validateSales = (sales) => {
  sales.forEach(({ productId, quantity }) => {
    if (!productId) throw new CustomError(400, productIdRequired);
    if (quantity === undefined) throw new CustomError(400, productQuantityRequired);
    if (quantity < 1) throw new CustomError(422, productQuantityNotZero);
  });
};

module.exports = {
   validateSales,
}; 
const CustomError = require('../errors/CustomError');
const { productIdRequired, productQuantityRequired,
  productQuantityNotZero } = require('../errors/errorProduct');

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

const CustomError = require('../middlewares/customError');
const { nameRequired, nameLength } = require('../middlewares/errors');
const { productIdRequired, productQuantityRequired,
  productQuantityNotZero } = require('../middlewares/errors');

const validateName = (name) => {
  if (!name) throw new CustomError(400, nameRequired);
  if (name.length < 5) throw new CustomError(422, nameLength);
};

const validateSales = (sales) => {
  sales.forEach(({ productId, quantity }) => {
    if (!productId) throw new CustomError(400, productIdRequired);
    if (quantity === undefined) throw new CustomError(400, productQuantityRequired);
    if (quantity < 1) throw new CustomError(422, productQuantityNotZero);
  });
};

module.exports = {
  validateName, validateSales,
}; 
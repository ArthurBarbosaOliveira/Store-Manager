const NotFoundError = 'Product not found';

const nameRequired = '"name" is required';

const nameLength = '"name" length must be at least 5 characters long';

const productIdRequired = '"productId" is required';

const productQuantityRequired = '"quantity" is required';

const productQuantityNotZero = '"quantity" must be greater than or equal to 1';

module.exports = {
  NotFoundError,
  nameRequired,
  nameLength,
  productIdRequired,  
  productQuantityRequired,
  productQuantityNotZero,
};

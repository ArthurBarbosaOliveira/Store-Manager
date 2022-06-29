const { Router } = require('express');
const ProductsController = require('../controllers/ProductsControllers');

const route = Router();

route.get('/', ProductsController.productAll);

route.get('/:id', ProductsController.productById);

module.exports = route;

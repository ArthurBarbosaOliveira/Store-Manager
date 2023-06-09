const { Router } = require('express');
const ProductsController = require('../controllers/ProductsControllers');

const route = Router();

route.get('/', ProductsController.productAll);

route.get('/:id', ProductsController.productById);

route.post('/', ProductsController.create);

route.put('/:id', ProductsController.update);

route.delete('/:id', ProductsController.remove);

module.exports = route;

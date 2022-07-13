const { Router } = require('express');
const salesController = require('../controllers/sales');

const salesRoute = Router();

salesRoute.post('/', salesController.registro);

salesRoute.get('/', salesController.salesAll);

salesRoute.get('/:id', salesController.findById);

module.exports = salesRoute;

const { Router } = require('express');
const salesController = require('../controllers/sales');

const salesRoute = Router();

salesRoute.post('/', salesController.registro);

module.exports = salesRoute;

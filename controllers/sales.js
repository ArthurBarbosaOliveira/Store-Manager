const salesService = require('../services/sales');

const registro = async (request, response) => {
  const sales = request.body;

  const result = await salesService.registro(sales);

  response.status(201).json(result);
};

module.exports = {
  registro,
}; 

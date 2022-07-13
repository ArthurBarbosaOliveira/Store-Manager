const salesService = require('../services/sales');

const registro = async (request, response) => {
  const sales = request.body;

  const result = await salesService.registro(sales);

  response.status(201).json(result);
};

const salesAll = async (_req, res) => {
  const result = await salesService.salesAll();

  res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.findById(id);
  res.status(200).json(result);
};

module.exports = {
  registro,
  findById,
  salesAll,
}; 

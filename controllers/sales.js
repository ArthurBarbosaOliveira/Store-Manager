const salesService = require('../services/sales');

const registro = async (request, response) => {
  const sales = request.body;

  const result = await salesService.registro(sales);

  response.status(201).json(result);
};

const salesAll = async (request, response) => {
  const result = await salesService.salesAll();

  response.status(200).json(result);
};

const findById = async (request, response) => {
  const { id } = request.params;

  const result = await salesService.findById(id);
  response.status(200).json(result);
};

const remove = async (request, response) => {
  const { id } = request.params;

  await salesService.remove(id);

  response.sendStatus(204);
};

module.exports = {
  registro,
  findById,
  salesAll,
  remove,
}; 

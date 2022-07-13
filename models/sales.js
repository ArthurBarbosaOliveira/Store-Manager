const db = require('./connection');

const create = async () => {
  const sqlQuery = `
  INSERT INTO StoreManager.sales (id, date)
  VALUES (DEFAULT, DEFAULT);
  `;

  const [result] = await db.query(sqlQuery);

  return result;
};

const registro = async (saleId, productId, quantity) => {
  const sqlQuery = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);
  `;

  await db.query(sqlQuery, [saleId, productId, quantity]);
};

module.exports = {
  create, registro,
}; 

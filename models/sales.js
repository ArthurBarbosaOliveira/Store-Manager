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

const salesAll = async () => {
  const sqlQuery = `
  SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id ASC, sp.product_id ASC;
  `;

  const [results] = await db.query(sqlQuery);

  return results;
};

const findById = async (id) => {
  const sqlQuery = `
  SELECT s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE id = ?;
  `;

  const [results] = await db.query(sqlQuery, id);
  return results;
};

const remove = async (id) => {
  const sqlQuery = `
  DELETE FROM StoreManager.sales
  WHERE id = ?;
  `;

  const [results] = await db.query(sqlQuery, id);

  return results;
};

module.exports = {
  create, registro, salesAll, findById, remove,
}; 

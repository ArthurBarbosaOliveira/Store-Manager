const db = require('./connection');

const create = async (name) => {
  const sql = `
  INSERT INTO StoreManager.products (name)
  VALUES (?);
  `;

  const [products] = await db.query(sql, name);

  return products;
};

const productAll = async () => {
  const sql = `SELECT *
      FROM StoreManager.products`;
  const [products] = await db.query(sql);
  return products;
};

const productById = async (id) => {
    const sql = `SELECT *
      FROM StoreManager.products
      WHERE id = ?
      ORDER BY id`;
  const [[products]] = await db.query(sql, [id]);
  return products;
};
  
const update = async (id, name) => {
  const sql = `
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?;
  `;

  const [products] = await db.query(sql, [name, id]);
  return products;
};

const remove = async (id) => {
  const sql = `
  DELETE FROM StoreManager.products
  WHERE id = ?;
  `;

  const [products] = await db.query(sql, id);
  return products;
};

module.exports = {
  productAll,
  productById,
  create,
  update,
  remove,
};

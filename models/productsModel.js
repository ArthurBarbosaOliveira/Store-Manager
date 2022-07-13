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
  const [[product]] = await db.query(sql, [id]);
    return product;
  };

module.exports = {
  productAll,
  productById,
  create,
};

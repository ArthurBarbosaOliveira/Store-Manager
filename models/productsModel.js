const db = require('./connection');

const productAll = async () => {
  const sql = `SELECT *
      FROM StoreManager.products`;
  const [products] = await db.execute(sql);
  return products;
};

const productById = async (id) => {
    const sql = `SELECT *
      FROM StoreManager.products
      WHERE id = ?
      ORDER BY id`;
  const [[product]] = await db.execute(sql, [id]);
    return product;
  };

module.exports = {
  productAll,
  productById,
};

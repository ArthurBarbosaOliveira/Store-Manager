const db = require('./db');

const getProducts = {

  productAll: async () => {
    const sql = `SELECT *
      FROM StoreManager.products`;
    const [products] = await db.query(sql);
    return products;
  },
  productById: async (id) => {
    const sql = `SELECT *
      FROM StoreManager.products
      WHERE id = ?
      ORDER BY id`;
    const [[product]] = await db.query(sql, [id]);
    return product;
  },
};

module.exports = getProducts;

const mysql = require('mysql2/promise');

const db = mysql.createPool({  
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || 'StoreManager',  
});

module.exports = db;

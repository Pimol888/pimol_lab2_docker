const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

function init() {
  pool.query(`
    CREATE TABLE IF NOT EXISTS todo_items (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255),
      completed BOOLEAN
    )
  `);
}

function getItems() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM todo_items', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function storeItem(item) {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO todo_items VALUES (?, ?, ?)',
      [item.id, item.name, item.completed],
      err => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

init();

module.exports = {
  getItems,
  storeItem
};

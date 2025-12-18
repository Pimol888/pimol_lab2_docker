const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app'
});

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

module.exports = {
  getItems,
  storeItem
};

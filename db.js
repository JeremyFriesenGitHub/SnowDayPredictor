const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
});

module.exports = {
  // Insert data
  insertData: (name, callback) => {
    const stmt = db.prepare('INSERT INTO mytable (name) VALUES (?)');
    stmt.run(name, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
    stmt.finalize();
  },
  
  // Retrieve data
  getData: (callback) => {
    db.all('SELECT * FROM mytable', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  // Update data
  updateData: (id, name, callback) => {
    const stmt = db.prepare('UPDATE mytable SET name = ? WHERE id = ?');
    stmt.run(name, id, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
    stmt.finalize();
  },

  // Delete data
  deleteData: (id, callback) => {
    const stmt = db.prepare('DELETE FROM mytable WHERE id = ?');
    stmt.run(id, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
    stmt.finalize();
  },
};

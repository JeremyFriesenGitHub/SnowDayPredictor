class UserModel {
    constructor(db) {
      this.db = db;
    }
  
    // Create a new user
    createUser(username, password) {
      return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        this.db.run(sql, [username, password], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    }
  
    // Retrieve user by ID
    getUserById(userId) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        this.db.get(sql, [userId], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  
    // Update user information
    updateUser(userId, username, password) {
      return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
        this.db.run(sql, [username, password, userId], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        });
      });
    }
  
    // Delete a user
    deleteUser(userId) {
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        this.db.run(sql, [userId], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        });
      });
    }
  }
  
  module.exports = UserModel;
  
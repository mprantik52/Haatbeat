const sqlite3 = require('sqlite3').verbose();

// Open the database (if the file doesn't exist, it will be created)
const db = new sqlite3.Database('./products.db', (err) => {
  if (err) {
    console.error('Could not open database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
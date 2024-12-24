const db = require('./db');  //importing the db object from db.js

// db.run("DELETE FROM products where id > 10 and id <= 20");

db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error('Error fetching tables:', err.message);
      return;
    }
  
    // Print the names of all tables
    console.log('Product list:');
    console.table(rows);
    // rows.forEach((row) => {
    //   console.log(`${row.id}\t\t${row.name}\t\t${row.price}\t\t`);  // Output the table name
    // });
});


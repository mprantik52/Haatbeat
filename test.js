const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Import the database connection
const db = require('./db');  // Ensure you're importing the db object from db.js

app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);
});

// CREATE: Add a new product
app.post('/products', (req, res) => {
  console.log('Request body:', req.body);  // Debugging log
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  db.run('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], function (err) {
    if (err) {
      console.error('Error inserting product:', err.message);
      return res.status(500).json({ message: 'Error inserting product' });
    }
    res.status(201).json({ id: this.lastID, name, price });
  });
});

// READ: Get all products
app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      return res.status(500).json({ message: 'Error fetching products' });
    }
    res.status(200).json(rows);
  });
});

// READ: Get a single product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
    if (err) {
      console.error('Error fetching product:', err.message);
      return res.status(500).json({ message: 'Error fetching product' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(row);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
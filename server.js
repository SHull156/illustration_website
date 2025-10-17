// Import libraries required for backend
require('dotenv').config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

// Create the express app
const app = express();
app.use(cors()); // allow front end to fetch data
app.use(express.json());

console.log("STATIC PATH:", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/shop.html'));
});

const db = mysql.createConnection({
  host: process.env.RAILWAY_INTERNAL_DB_HOST,
  user: process.env.RAILWAY_INTERNAL_DB_USER,
  password: process.env.RAILWAY_INTERNAL_DB_PASSWORD,
  database: process.env.RAILWAY_INTERNAL_DB_NAME,
  port: process.env.RAILWAY_INTERNAL_DB_PORT
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection error:", err.message);
    return;
  }
  console.log("Connected to MySQL");
});

// Endpoint to get all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


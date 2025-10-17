// Import libraries required for backend
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

// Create the express app
const app = express();
app.use(cors()); // allow front end to fetch data
app.use(express.json());

// Serve all static files in public
console.log("STATIC PATH:", path.join(__dirname, "../public"));
app.use(express.static(path.join(__dirname, "../public")));

// Route for /shop
app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/shop.html'));
});

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) throw err;
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


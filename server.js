// Load environment variables
require("dotenv").config();

// Import libraries
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

// Create express app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
const publicPath = path.join(__dirname, "public");
console.log("STATIC PATH:", publicPath);
app.use(express.static(publicPath));

// Shop page route
app.get("/shop", (req, res) => {
  res.sendFile(path.join(publicPath, "shop.html"));
});

// --------------------
// MySQL connection pool (IMPORTANT FIX)
// --------------------
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQLPORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test DB connection on startup
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL pool connected");
  }
});

// --------------------
// API routes
// --------------------
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    res.json(results);
  });
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

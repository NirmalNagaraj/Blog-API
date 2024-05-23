// db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust the limit as needed
  queueLimit: 0
});

module.exports = connection.promise(); // Use the promise wrapper for async/await

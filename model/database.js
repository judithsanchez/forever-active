// Import required modules
require('dotenv').config(); // Loads environment variables from a .env file
const mysql = require('mysql'); // MySQL module for interacting with the database
const fs = require('fs'); // File system module for reading files

// Retrieve required environment variables
const DB_HOST = process.env.DB_HOST; // Database host
const DB_USER = process.env.DB_USER; // Database username
const DB_PASS = process.env.DB_PASS; // Database password
const DB_NAME = process.env.DB_NAME; // Database name

// Create a MySQL connection object with the provided configuration
const con = mysql.createConnection({
  host: DB_HOST || '127.0.0.1', // Use the provided host or fallback to the default value
  user: DB_USER || 'root', // Use the provided username or fallback to the default value
  password: DB_PASS, // Use the provided password
  database: DB_NAME || 'workouts', // Use the provided database name or fallback to the default value
  multipleStatements: true, // Allows executing multiple SQL statements in a single query
});

// Connect to the MySQL database
con.connect(function (err) {
  if (err) throw err; // If an error occurs while connecting, throw an exception

  console.log('Connected!'); // Connection successful
  let sql = fs.readFileSync(__dirname + '/init_db.sql').toString(); // Read the SQL file and convert it to a string

  // Execute the SQL query to create tables in the database
  con.query(sql, function (err, result) {
    if (err) throw err; // If an error occurs while executing the query, throw an exception

    console.log('Table creation was successful!'); // Table creation successful

    console.log('Closing...'); // Close the database connection
  });

  con.end(); // Close the MySQL connection
});

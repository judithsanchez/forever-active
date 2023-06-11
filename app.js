// Importing required modules
var express = require('express'); // Express framework for Node.js
var path = require('path'); // Path module for working with file and directory paths
var cookieParser = require('cookie-parser'); // Middleware for handling cookies
var logger = require('morgan'); // Middleware for logging HTTP requests
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing

// Importing routers
var indexRouter = require('./routes/index'); // Router for the root path
var workoutsRouter = require('./routes/workouts'); // Router for the "/workouts" path
var searchRouter = require('./routes/search'); // Router for the "/search" path
var keyRouter = require('./routes/keywords'); // Router for the "/keywords" path

var app = express(); // Creating an instance of the Express application

app.use(cors()); // Using the CORS middleware to enable Cross-Origin Resource Sharing
app.use(logger('dev')); // Using the logger middleware to log HTTP requests
app.use(express.json()); // Parsing incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded data
app.use(cookieParser()); // Using the cookie-parser middleware for handling cookies

// This is related to the api calls, not react-router-dom

app.use('/api', indexRouter); // Using the indexRouter for the "/api" path
app.use('/api/workouts', workoutsRouter); // Using the workoutsRouter for the "/api/workouts" path
app.use('/api/search', searchRouter); // Using the searchRouter for the "/api/search" path
app.use('/api/keywords', keyRouter); // Using the keyRouter for the "/api/keywords" path

module.exports = app; // Exporting the app module

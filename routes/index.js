var express = require('express');
var router = express.Router();
const db = require('../model/helper');

/* GET home page. */

// This route handles the GET request to the root path ("/").
// It sends a simple response of "Hello from Homepage" to the client.

router.get('/', async function (req, res, next) {
  try {
    res.send('Hello from Homepage');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
const db = require('../model/helper');

module.exports = router;

// This route handles the GET request to the root path ("/").
// It queries the database for all the records from the "keywords" table.
// It sends the retrieved data as a response to the client.
router.get('/', async function (req, res, next) {
  try {
    const result = await db('SELECT * FROM keywords;');
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

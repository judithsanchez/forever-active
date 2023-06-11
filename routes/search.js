var express = require('express');
var router = express.Router();
const db = require('../model/helper');

module.exports = router;

// This route handles the GET request to the root path ("/").
// It retrieves the "keyword" parameter from the query string of the request.
// It queries the database for records from the "workouts" table that match the keyword.
// It performs a JOIN operation with the "workout_keyword" and "keywords" tables to retrieve additional information.
// It sends the retrieved data as a response to the client.

router.get('/', async function (req, res, next) {
  const keyword = req.query.keyword;
  try {
    const result = await db(
      `SELECT * FROM workouts LEFT JOIN workout_keyword ON workouts.id = workout_keyword.WorkoutID LEFT JOIN keywords ON keywords.id = workout_keyword.KeywordID WHERE keywords.text LIKE "%${keyword}%";`
    );
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// This route handles the GET request to a specific workout ID ("/:id").
// It queries the database for a specific record from the "workout_keyword" table based on the ID parameter.
// It sends the retrieved data as a response to the client.
router.get('/:id', async function (req, res, next) {
  try {
    const result = await db(
      `SELECT * FROM workout_keyword WHERE id = ${req.params.id};`
    );
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

var express = require('express');
var router = express.Router();
const db = require('../model/helper');

// This route handles the GET request to the root path ("/").
// It queries the database for all the records from the "workouts" table.
// It sends the retrieved data as a response to the client.
router.get('/', async function (req, res, next) {
  try {
    const result = await db('SELECT * FROM workouts;');
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// This route handles the GET request to a specific workout ID ("/:id").
// It queries the database for a specific record from the "workouts" table based on the workout ID parameter.
// It sends the retrieved data as a response to the client.
router.get('/:id', async function (req, res, next) {
  try {
    const result = await db(
      `SELECT * FROM workouts WHERE workout_id = ${req.params.id};`
    );
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// This route handles the POST request to the root path ("/").
// It expects a JSON payload containing information about a new workout.
// It inserts the new workout data into the "workouts" table in the database.
// It then queries the database for all the records from the "workouts" table.
// It sends the updated data as a response to the client.
router.post('/', async function (req, res, next) {
  try {
    await db(
      `INSERT INTO workouts (title, url, embedID, minutes, calories, iscomplete) VALUES("${req.body.title}", "${req.body.url}", "${req.body.embedID}", ${req.body.minutes}, ${req.body.calories}, 0);`
    );
    const result = await db('SELECT * FROM workouts;');
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

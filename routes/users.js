var express = require('express');
var router = express.Router();
const db = require('../model/helper');

module.exports = router;

// GET all users
router.get('/', async function (req, res, next) {
  try {
    const result = await db('SELECT * FROM users;');
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET user by ID
router.get('/:id', async function (req, res, next) {
  try {
    const result = await db(`SELECT * FROM users WHERE id = ${req.params.id};`);
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST create a new user
router.post('/', async function (req, res, next) {
  try {
    const { username, isAdmin, password, favoriteWorkouts } = req.body;

    // Convert favoriteWorkouts to JSON string
    const favoriteWorkoutsJSON = JSON.stringify(favoriteWorkouts);

    await db(
      `INSERT INTO users (username, isAdmin, password, favoriteWorkouts) VALUES ("${username}", ${isAdmin}, "${password}", '${favoriteWorkoutsJSON}');`
    );

    // Fetch the updated list of users
    const userList = await db('SELECT * FROM users;');
    res.send(userList.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE user by ID
router.delete('/:id', async function (req, res, next) {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Delete the user
    await db(`DELETE FROM users WHERE id = ${userId};`);

    // Fetch the updated list of users
    const userList = await db('SELECT * FROM users;');
    res.send(userList.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update username of a user
router.patch('/:id/username', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { username } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Update the username of the user
    await db(`UPDATE users SET username = "${username}" WHERE id = ${userId};`);

    // Fetch the updated user
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${userId};`);
    res.send(updatedUser.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update isAdmin status of a user
router.patch('/:id/isadmin', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { isAdmin } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Update the isAdmin status of the user
    await db(`UPDATE users SET isAdmin = ${isAdmin} WHERE id = ${userId};`);

    // Fetch the updated user
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${userId};`);
    res.send(updatedUser.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update password of a user
router.patch('/:id/password', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Update the password of the user
    await db(`UPDATE users SET password = "${password}" WHERE id = ${userId};`);

    // Fetch the updated user
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${userId};`);
    res.send(updatedUser.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

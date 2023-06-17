var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const db = require('../model/helper');
require('dotenv').config();
var bcrypt = require('bcrypt');
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

// Get requests
// See all users
router.get('/', async function (req, res, next) {
  try {
    const result = await db('SELECT * FROM users;');
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST requests

// Signup

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const favoriteWorkoutsJSON = JSON.stringify([]);

    await db(
      `INSERT INTO users (username, password, isAdmin, favoriteWorkouts) VALUES ("${username}" , "${hash}", 0, '${favoriteWorkoutsJSON}')`
    );

    res.send({ message: 'Register successful' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Login

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error('Incorrect password');

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: 'Login successful, here is your token', token });
    } else {
      throw new Error('User does not exist');
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// The middleware call this function next

router.get('/profile', userShouldBeLoggedIn, async (req, res) => {
  const result = await db(`SELECT * FROM users WHERE id = ${req.user_id};`);
  const user = result.data[0];

  res.send({
    // message: 'Here is the PROTECTED data for user ' + req.user_id,
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    favoriteWorkouts: user.favoriteWorkouts,
  });
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

// PATCH
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

// Reset password of a user
router.patch('/:id/reset-password', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the password of the user with the hashed password
    await db(
      `UPDATE users SET password = "${hashedPassword}" WHERE id = ${userId};`
    );

    // Fetch the updated user
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${userId};`);
    res.send(updatedUser.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id/addfavoriteworkouts', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { favoriteWorkouts } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Fetch the current favoriteworkouts array
    const existingUser = userExists.data[0];
    const currentFavoriteWorkouts = JSON.parse(existingUser.favoriteWorkouts);

    // Merge the existing and new favoriteWorkouts arrays
    const updatedFavoriteWorkouts = [
      ...currentFavoriteWorkouts,
      ...favoriteWorkouts,
    ];

    // Convert the updated favoriteWorkouts array to a stringified JSON
    const updatedFavoriteWorkoutsString = JSON.stringify(
      updatedFavoriteWorkouts
    );

    // Update the favorite workouts of the user
    await db(
      `UPDATE users SET favoriteWorkouts = '${updatedFavoriteWorkoutsString}' WHERE id = ${userId};`
    );

    // Fetch the updated user
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${userId};`);
    res.send(updatedUser.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id/removefavoriteWorkouts', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { favoriteWorkouts } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Fetch the current favoriteWorkouts array
    const existingUser = userExists.data[0];
    const currentFavoriteWorkouts = JSON.parse(existingUser.favoriteWorkouts);

    // Remove the workout ID from the favoriteWorkouts array
    const updatedFavoriteWorkouts = currentFavoriteWorkouts.filter(
      (workoutId) => !favoriteWorkouts.includes(workoutId)
    );

    // Convert the updated favoriteWorkouts array to a stringified JSON
    const updatedFavoriteWorkoutsString = JSON.stringify(
      updatedFavoriteWorkouts
    );

    // Update the favorite workouts of the user
    await db(
      `UPDATE users SET favoriteWorkouts = '${updatedFavoriteWorkoutsString}' WHERE id = ${userId};`
    );

    // Fetch the updated user
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${userId};`);
    res.send(updatedUser.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

// // GET user by ID
// router.get('/:id', async function (req, res, next) {
//   try {
//     const result = await db(`SELECT * FROM users WHERE id = ${req.params.id};`);
//     res.send(result.data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

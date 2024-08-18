const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @fileOverview Routes for handling user operations in the application.
 * 
 * @requires express
 * @requires ../controllers/userController
 */

/**
 * Route to register a new user.
 * 
 * @name POST /users/register
 * @memberof! express.Router
 * @inner
 * @function
 * @param {Object} req.body - The data for the new user (email, password).
 * @returns {Object} A JSON Web Token (JWT) upon successful registration.
 */
router.post('/register', userController.register);

/**
 * Route to login a user.
 * 
 * @name POST /users/login
 * @memberof! express.Router
 * @inner
 * @function
 * @param {Object} req.body - The login credentials (email, password).
 * @returns {Object} A JSON Web Token (JWT) upon successful login.
 */
router.post('/login', userController.login);

/**
 * Route to get all users.
 * 
 * @name GET /users
 * @memberof! express.Router
 * @inner
 * @function
 * @returns {Array<Object>} An array of all registered users.
 */
router.get('/', userController.getUsers);

/**
 * Route to get a user by their ID.
 * 
 * @name GET /users/:id
 * @memberof! express.Router
 * @inner
 * @function
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Object} The user data for the specified ID.
 */
router.get('/:id', userController.getUserById);

/**
 * Route to update a user.
 * 
 * @name PUT /users/:id
 * @memberof! express.Router
 * @inner
 * @function
 * @param {string} id - The ID of the user to update.
 * @param {Object} req.body - The updated user data.
 * @returns {Object} The updated user data.
 */
router.put('/:id', userController.updateUser);

/**
 * Route to delete a user.
 * 
 * @name DELETE /users/:id
 * @memberof! express.Router
 * @inner
 * @function
 * @param {string} id - The ID of the user to delete.
 * @returns {string} A message confirming the user deletion.
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
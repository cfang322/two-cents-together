// This file is exposing your endpoints. It connects URLs to logic.

// You create a router and pull in the logive from the controller.
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// If someone POSTs to /auth/signup, run the signup() function; same logic for login
router.post('/signup', signup);
router.post('/login', login);

// export the router so it can be added to the main server.
module.exports = router;
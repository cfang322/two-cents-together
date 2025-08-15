// This file contains the logic for Signup & Login

// bcrypt hashes passwords (so they're never stored in plain text)
const bcrypt = require('bcrypt');
// jwt lets you issue secure "session" tokens to users who log in
const jwt = require('jsonwebtoken');
// PrismaClient talks to your PostgrSQL db
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JWT_SECRET = 'your_jwt_secret'; // ⚠️ store this in .env in production

// Signup controller
// you're expecting the frontend to send an email and password
async function signup(req, res) {
  const { email, password } = req.body;

  try {
    // you check if the user already exists, if so, you block duplicate accounts
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash the password for safety. NEVER store real passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the user with the hashed password in the db
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // return success and basic info
    res.status(201).json({ message: 'User created', user: { email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
}

// Login controller
// find the user by email; if they dont exist, fail
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // check if the entered password matches the hashed password; fail if not
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // create a token with the user ID inside; it expires in 1 hr
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // send the token back to the frontend to store and use
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
}

// you export these functions so authRoutes.js can use them
module.exports = { signup, login };

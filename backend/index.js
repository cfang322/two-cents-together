// This file is where everything is hooked up and connected!!

// set up your server and import the authRoutes
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Let your app accept JSON and cross-origin requests (CORS is important for frontend <-> backend)
const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// just a basic test route
app.get('/', (req, res) => {
  res.send('Hello from Two Cents Together backend!');
});
 
// Mount auth routes
// This connects all the /auth/signup and /auth/login routes to your app; anything stating with /auth will be handled in authRoutes.js
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});

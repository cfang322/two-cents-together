const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Two Cents Together backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});

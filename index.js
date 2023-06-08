const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// In-memory data store for asteroids
let asteroids = [];

// Middleware to parse JSON data
app.use(express.json());

// Route to get all favourite asteroids
app.get('/asteroids', (req, res) => {
  res.json(asteroids);
});

// Route to get a specific asteroid by ID
app.get('/asteroids/:id', (req, res) => {
  const asteroidId = req.params.id;
  const asteroid = asteroids.find((a) => a.id === asteroidId);
  if (asteroid) {
    res.json(asteroid);
  } else {
    res.status(404).json({ message: 'Asteroid not found' });
  }
});

// Route to create a new favourite asteroid
app.post('/asteroids', (req, res) => {
  const newAsteroid = {
    id: req.body.id,
    data: req.body.data || {} // Additional JSON object data for the asteroid
  };

  const existingAsteroid = asteroids.find((a) => a.id === newAsteroid.id);
  if (existingAsteroid) { // Avoid duplicates
    return  res.status(201).json(newAsteroid);
  }

  asteroids.push(newAsteroid);
  res.status(201).json(newAsteroid);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

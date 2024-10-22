// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Create a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('About Us Page');
  });
  
  app.get('/contact', (req, res) => {
    res.send('Contact Page');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db')

const app = express();

connectDB();

const authRoutes = require('./routes/auth');

app.use(cors({
  origin: 'http://localhost:4200',
}))
app.use(bodyParser.json());

const PORT = 3000;

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  // Page not found 
  res.status(404).send('<h1>Page not found</h1>');
});

const server = http.createServer(app);

server.listen(PORT);
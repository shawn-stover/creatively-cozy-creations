// Imports
import dotenv from 'dotenv';
import express from 'express';
import data from './data.js';

dotenv.config();

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Served at http://localhost:${port}`);
});

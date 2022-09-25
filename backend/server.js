// Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// POST request is converted to JSON object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/api/keys/google', (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || '' });
});

app.use('/api/upload', uploadRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// Middleware for ExpressASyncHandler
app.use((err, res) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Served at http://localhost:${port}`);
});

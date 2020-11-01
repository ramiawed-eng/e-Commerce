import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

ConnectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/*', notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

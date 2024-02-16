import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

// Configuración para poder utilizar las variables de entorno
dotenv.config();

// Definición del puerto
const port = process.env.PORT || 5000;

// Implementando conexión con la B.D
connectDB();

// Inicializando a Express
const app = express();

// Middlewares para manejar lo recibido
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Implementando los enrutadores (API)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Implementando la ruta para la API de PayPal
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Middlewares para el manejo de errores
app.use(notFound);
app.use(errorHandler);

// Levantando el servidor
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
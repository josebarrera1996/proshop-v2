import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

// Configuración para poder utilizar las variables de entorno
dotenv.config();

// Definición del puerto
const port = process.env.PORT || 5000;

// Implementando conexión con la B.D
connectDB();

// Inicializando a Express
const app = express();

// Implementando los enrutadores
app.use('/api/products', productRoutes);

// Levantando el servidor
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
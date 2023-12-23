import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

// Configuración para poder utilizar las variables de entorno
dotenv.config();

// Definición del puerto
const port = process.env.PORT || 5000;

// Implementando conexión con la B.D
connectDB();

// Inicializando a Express
const app = express();

/* Rutas de ejemplo */
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Levantando el servidor
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
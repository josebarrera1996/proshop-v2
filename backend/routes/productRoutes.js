import express from 'express';
// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

// Creamos un nuevo enrutador de Express para manejar rutas específicas
const router = express.Router();

// Ruta para obtener todos los productos
router.get(
    '/',
    // Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
    asyncHandler(async (req, res) => {
        // Consulta a la base de datos para obtener todos los productos
        const products = await Product.find({});
        // Envía los productos como respuesta en formato JSON
        res.json(products);
    })
);

// Ruta para obtener un producto por su ID
router.get(
    '/:id',
    // Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
    asyncHandler(async (req, res) => {
        // Consulta a la base de datos para obtener un producto por su ID
        const product = await Product.findById(req.params.id);
        // Si el producto existe, lo envía como respuesta en formato JSON
        if (product) {
            return res.json(product);
        }
        // Si el producto no existe, envía un error 404 con un mensaje
        res.status(404);
        throw new Error('Resource not found');
    })
);

// Exportamos el enrutador para su uso en la aplicación principal de Express
export default router;

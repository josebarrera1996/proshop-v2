import express from 'express';
import {
    getProducts,
    getProductById,
} from '../controllers/productController.js';

// Creamos un nuevo enrutador de Express para manejar rutas específicas
const router = express.Router();

/* Definiendo las rutas */
router.route('/').get(getProducts); // Ruta para traer a todos los productos
router.route('/:id').get(getProductById); // Ruta para traer a un producto por su ID

// Exportamos el enrutador para su uso en la aplicación principal de Express
export default router;

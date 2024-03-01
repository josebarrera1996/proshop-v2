import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

// Creamos un nuevo enrutador de Express para manejar rutas específicas
const router = express.Router();

/* Definiendo las rutas */
router.route('/').get(getProducts).post(protect, admin, createProduct); // Ruta para traer a todos los productos y ruta para crear un nuevo producto
router.route('/:id').get(getProductById).put(protect, admin, updateProduct);; // Rutas para traer a un producto por su ID y para poder actualizarlo por su ID

// Exportamos el enrutador para su uso en la aplicación principal de Express
export default router;

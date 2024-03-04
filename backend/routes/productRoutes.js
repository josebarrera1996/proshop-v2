import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

// Creamos un nuevo enrutador de Express para manejar rutas específicas
const router = express.Router();

/* Definiendo las rutas */
router.route('/').get(getProducts).post(protect, admin, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

// Exportamos el enrutador para su uso en la aplicación principal de Express
export default router;

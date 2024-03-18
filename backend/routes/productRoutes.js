import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import checkObjectId from '../middlewares/checkObjectId.js';

// Creamos un nuevo enrutador de Express para manejar rutas específicas
const router = express.Router();

/* Definiendo las rutas */
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopProducts);
router
    .route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

// Exportamos el enrutador para su uso en la aplicación principal de Express
export default router;

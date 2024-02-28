// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Traer todos los productos
// @route   GET /api/products
// @access  Público
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const getProducts = asyncHandler(async (req, res) => {
    // Consulta a la base de datos para obtener todos los productos
    const products = await Product.find({});
    // Envía los productos como respuesta en formato JSON
    res.json(products);
});

// @desc    Traer solo un producto (por su ID)
// @route   GET /api/products/:id
// @access  Público
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const getProductById = asyncHandler(async (req, res) => {
    // Consulta a la base de datos para obtener un producto por su ID
    const product = await Product.findById(req.params.id);
    // Si el producto existe, lo envía como respuesta en formato JSON
    if (product) {
        return res.json(product);
    }
    // Si el producto no existe, envía un error 404 con un mensaje
    res.status(404);
    throw new Error('Resource not found');
});

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private/Admin
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const createProduct = asyncHandler(async (req, res) => {
    // Preparando objeto con datos de ejemplo para un Producto
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// Exportando los métodos
export { getProducts, getProductById, createProduct };
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

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const updateProduct = asyncHandler(async (req, res) => {
    // Extraer datos del cuerpo de la solicitud
    const { name, price, description, image, brand, category, countInStock } = req.body;

    // Buscar el producto por su ID
    const product = await Product.findById(req.params.id);

    // Verificar si el producto existe
    if (product) {
        // Actualizar los campos del producto con los nuevos valores
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        // Guardar el producto actualizado en la base de datos
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        // Responder con un código 404 si el producto no se encuentra
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const deleteProduct = asyncHandler(async (req, res) => {
    // Buscar el producto por su ID en la base de datos
    const product = await Product.findById(req.params.id);

    // Verificar si el producto existe
    if (product) {
        // Eliminar el producto utilizando su ID
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        // Responder con un código de estado 404 y lanzar un error si el producto no se encuentra
        res.status(404);
        throw new Error('Product not found');
    }
});

// Exportando los métodos
export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
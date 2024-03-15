// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Traer todos los productos
// @route   GET /api/products
// @access  Público
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const getProducts = asyncHandler(async (req, res) => {
    // Tamaño de la página y página actual obtenidos de la consulta o establecidos por defecto
    const pageSize = 4; // con el valor '1' apreciarás la búsqueda con paginación (por ej, con 'phone' -> search/phone/page/1)
    const page = Number(req.query.pageNumber) || 1;

    // Condicional para construir la búsqueda por palabra clave
    const keyword = req.query.keyword
        ? {
            name: {
                // Expresión regular para buscar la palabra clave, opción 'i' para insensibilidad a mayúsculas y minúsculas
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    // Obtiene el número total de productos que coinciden con la búsqueda
    const count = await Product.countDocuments({ ...keyword });

    // Obtiene los productos que coinciden con la búsqueda, con paginación
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    // Envia una respuesta JSON con los productos, la página actual y el número total de páginas
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Crear una nueva reseña
// @route   POST /api/products/:id/reviews
// @access  Private
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const createProductReview = asyncHandler(async (req, res) => {
    // Extrae la calificación y el comentario del cuerpo de la solicitud
    const { rating, comment } = req.body;

    // Encuentra el producto por su ID
    const product = await Product.findById(req.params.id);

    // Verifica si el producto existe
    if (product) {
        // Verifica si el usuario ya revisó el producto
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        // Si el usuario ya revisó el producto, devuelve un error
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        // Crea un objeto de reseña con los detalles proporcionados por el usuario
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        // Agrega la nueva reseña al array de reseñas del producto
        product.reviews.push(review);

        // Actualiza el número total de reseñas del producto
        product.numReviews = product.reviews.length;

        // Calcula la nueva calificación promedio del producto
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        // Guarda los cambios en el producto
        await product.save();

        // Devuelve una respuesta de éxito con un mensaje
        res.status(201).json({ message: 'Review added' });
    } else {
        // Si el producto no se encuentra, devuelve un error 404
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
    createProductReview
};
import mongoose from 'mongoose';

// Definición del esquema para las reseñas de los productos
const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true }, 
        rating: { type: Number, required: true }, 
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId, // Referencia al usuario que hizo la reseña
            required: true,
            ref: 'User', // La colección de referencia para el ObjectId, que no es otra que User
        },
    },
    {
        timestamps: true, // Campos automáticos de mongoose para createdAt y updatedAt
    }
);

// Definición del esquema para los productos
const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // Referencia al usuario que registra el producto
            required: true,
            ref: 'User', // La colección de referencia para el ObjectId, que no es otra que User
        },
        name: {
            type: String, 
            required: true,
        },
        image: {
            type: String, 
            required: true,
        },
        brand: {
            type: String, 
            required: true,
        },
        category: {
            type: String, 
            required: true,
        },
        description: {
            type: String, 
            required: true
        },
        reviews: [reviewSchema], // Array de reseñas, usando el esquema de reseña definido anteriormente
        rating: {
            type: Number, 
            required: true,
            default: 0, 
        },
        numReviews: {
            type: Number, 
            required: true,
            default: 0, 
        },
        price: {
            type: Number, 
            required: true,
            default: 0, 
        },
        countInStock: {
            type: Number, 
            required: true,
            default: 0, 
        },
    },
    {
        timestamps: true, // Campos automáticos de mongoose para createdAt y updatedAt
    }
);

// Creación del modelo 'Product' basado en el esquema de producto
const Product = mongoose.model('Product', productSchema);

// Exportación del modelo 'Product' para su uso en otras partes de la aplicación
export default Product;

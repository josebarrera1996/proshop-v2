import mongoose from 'mongoose';

// Definición del esquema de orden
const orderSchema = mongoose.Schema(
    {
        // Referencia al usuario que realiza la orden
        user: {
            type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referenciar a otro documento
            required: true, 
            ref: 'User', // Referencia al modelo 'User'
        },
        // Array que contiene los ítems de la orden
        orderItems: [
            {
                name: { type: String, required: true }, 
                qty: { type: Number, required: true }, 
                image: { type: String, required: true }, 
                price: { type: Number, required: true }, 
                // Referencia al producto específico
                product: {
                    type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referenciar a otro documento
                    required: true,
                    ref: 'Product', // Referencia al modelo 'Product'
                },
            },
        ],
        // Dirección de envío para la orden
        shippingAddress: {
            address: { type: String, required: true }, 
            city: { type: String, required: true }, 
            postalCode: { type: String, required: true }, 
            country: { type: String, required: true }, 
        },
        // Método de pago
        paymentMethod: {
            type: String,
            required: true,
        },
        // Resultado del pago (detalles proporcionados por el procesador de pagos)
        paymentResult: {
            id: { type: String }, 
            status: { type: String }, 
            update_time: { type: String }, 
            email_address: { type: String }, 
        },
        // Precios detallados de los ítems, impuestos, envío y total
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0, // Precio por defecto para evitar valores no definidos
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        // Indicadores de estado de la orden: pagada y entregada
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date, 
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false, 
        },
        deliveredAt: {
            type: Date, 
        },
    },
    {
        timestamps: true, // Crea automáticamente campos para registrar la creación y actualización de los documentos
    }
);

// Creación del modelo 'Order' basado en el esquema definido
const Order = mongoose.model('Order', orderSchema);

// Exportación del modelo 'Order' para su uso en otros archivos
export default Order;

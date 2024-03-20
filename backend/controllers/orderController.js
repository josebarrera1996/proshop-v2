// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// @desc    Crear nuevo pedido
// @route   POST /api/orders
// @access  Privado
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const addOrderItems = asyncHandler(async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    // Verificar si hay elementos de pedido y si están vacíos
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // Obtener los artículos pedidos de nuestra base de datos
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) },
        });

        // Mapear sobre los elementos de pedido y usar el precio de nuestros artículos de la base de datos
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
            );
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            };
        });

        // Calcular los precios
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
            calcPrices(dbOrderItems);

        // Crear una nueva orden con los detalles del pedido
        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // Guardar la orden en la base de datos
        const createdOrder = await order.save();

        // Responder con la orden creada
        res.status(201).json(createdOrder);
    }
});

// @desc    Obtener pedido por ID
// @route   GET /api/orders/:id
// @access  Privado
const getOrderById = asyncHandler(async (req, res) => {
    // Busca un pedido por su ID y realiza una operación de poblado para obtener detalles del usuario asociado
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    // Verifica si se encontró el pedido y responde con la información o lanza un error si no se encuentra
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Actualizar pedido a pagado
// @route   PUT /api/orders/:id/pay
// @access  Privado
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // Verificar el pago de PayPal
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error('Payment not verified');

    // Verificar si esta transacción se ha utilizado antes
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error('Transaction has been used before');

    // Encontrar la orden por el ID proporcionado en los parámetros de la solicitud
    const order = await Order.findById(req.params.id);

    if (order) {
        // Verificar que se haya pagado el monto correcto
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

        // Actualizar el estado de la orden a pagada y registrar los detalles del pago
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        // Guardar los cambios en la orden
        const updatedOrder = await order.save();

        // Responder con la orden actualizada
        res.json(updatedOrder);
    } else {
        // Responder con un error si no se encuentra la orden
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Actualizar pedido a enviado
// @route   PUT /api/orders/:id/deliver
// @access  Privado/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    // Buscar el pedido por ID
    const order = await Order.findById(req.params.id);

    // Verificar si se encuentra el pedido
    if (order) {
        // Actualizar el estado de entrega y establecer la fecha de entrega actual
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        // Guardar la orden actualizada en la base de datos
        const updatedOrder = await order.save();

        // Enviar la orden actualizada como respuesta JSON
        res.json(updatedOrder);
    } else {
        // Si no se encuentra el pedido, devolver un código de estado 404 y lanzar un error
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Obtener los pedidos realizados (aplicado para el usuario logeado)
// @route   GET /api/orders/myorders
// @access  Privado
const getMyOrders = asyncHandler(async (req, res) => {
    // Busca todos los pedidos donde el campo 'user' coincide con el ID del usuario logeado
    const orders = await Order.find({ user: req.user._id });

    // Responde con la lista de pedidos encontrados
    res.json(orders);
});

// @desc    Obtener todos los pedidos
// @route   GET /api/orders
// @access  Privado/Admin
const getOrders = asyncHandler(async (req, res) => {
    // Obtener los pedidos (populados con los datos especificados del usuario)
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// Exportando los métodos
export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
};
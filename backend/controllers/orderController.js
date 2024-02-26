// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc    Crear nuevo pedido
// @route   POST /api/orders
// @access  Privado
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const addOrderItems = asyncHandler(async (req, res) => {
    // Extraer los siguientes campos del cuerpo de la solicitud
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Verifica si hay elementos en el pedido y si no, devuelve un error
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // Crea una nueva instancia de Order con la información proporcionada
        const order = new Order({
            // Mapea y transforma los elementos del pedido para asociarlos con el producto correspondiente
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            // Asocia el usuario actual al pedido
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // Guarda el nuevo pedido en la base de datos
        const createdOrder = await order.save();

        // Responde con el nuevo pedido creado
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
    // Obtener el pedido (por el ID)
    const order = await Order.findById(req.params.id);

    // Si el pedido existe, actualizarlo a pagado
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        // Guardar la actualización realizada
        const updatedOrder = await order.save();

        // Mostrar el objeto del pedido con la actualización
        res.json(updatedOrder);
    } else {
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
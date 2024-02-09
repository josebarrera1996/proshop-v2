// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc    Crear nuevo pedido
// @route   POST /api/orders
// @access  Privado
// Envuelve el controlador asíncrono con asyncHandler para un manejo de errores adecuado
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('create order');
});

// @desc    Obtener pedido por ID
// @route   GET /api/orders/:id
// @access  Privado
const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by id');
});

// @desc    Actualizar pedido a pagado
// @route   GET /api/orders/:id/pay
// @access  Privado
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
});

// @desc    Actualizar pedido a enviado
// @route   GET /api/orders/:id/deliver
// @access  Privado/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

// @desc    Obtener los pedidos realizados (aplicado para el usuario logeado)
// @route   GET /api/orders/myorders
// @access  Privado
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get logged in user orders');
});

// @desc    Obtener todos los pedidos
// @route   GET /api/orders
// @access  Privado/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
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
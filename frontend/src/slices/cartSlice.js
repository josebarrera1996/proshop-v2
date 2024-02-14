// Importación de createSlice de Redux Toolkit para crear un slice de estado de manera eficiente
import { createSlice } from '@reduxjs/toolkit';
// Importación de la función updateCart para manejar la lógica de actualización del carrito
import { updateCart } from '../utils/cartUtils';

// Estado inicial del carrito, intentando recuperar el estado desde localStorage
// Si no hay datos en localStorage, se inicializa con un carrito vacío
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')) // Parsea el estado del carrito almacenado en localStorage
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }; // Estado inicial por defecto con el carrito vacío

// Creación del slice del carrito
const cartSlice = createSlice({
    name: 'cart', // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para agregar items al carrito
        addToCart: (state, action) => {
            const item = action.payload; // Obtiene el item del payload de la acción

            // Busca si el item ya existe en el carrito
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // Si el item existe, actualiza su cantidad
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                // Si el item no existe, agrega el nuevo item al array de cartItems
                state.cartItems = [...state.cartItems, item];
            }

            // Actualiza los precios y los guarda en el almacenamiento local
            return updateCart(state);
        },
        // Reducer para eliminar items del carrito
        removeFromCart: (state, action) => {
            // Filtra el item a eliminar del array de cartItems
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            // Actualiza los precios y los guarda en el almacenamiento local
            return updateCart(state);
        },
        // Reducer para poder guardar la dirección de envío seleccionada por el usuario
        saveShippingAddress: (state, action) => {
            // Actualiza el estado del slice con la dirección de envío proveniente del payload de la acción
            state.shippingAddress = action.payload;

            // Actualiza la dirección de envío y lo guarda en el almacenamiento local
            return updateCart(state);
        },
        // Reducer para poder guardar el método de pago seleccionado por el usuario
        savePaymentMethod: (state, action) => {
            // Actualiza el estado del slice con el método de pago proveniente del payload de la acción
            state.paymentMethod = action.payload;

            // Actualiza el método de pago y lo guarda en el almacenamiento ocal
            return updateCart(state);
        },
        // Reducer para limpiar los items del carrito
        clearCartItems: (state, action) => {
            // Actualiza el estado del slice con la limpieza de los items del carrito
            state.cartItems = [];

            // Actualiza el estado de los items del carrito (sin nada) y lo guarda en el almacenamiento local
            return updateCart(state);
        },
    },
});

// Exporta las acciones definidas en el slice
export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems
} = cartSlice.actions;

// Exporta el reducer del slice para su uso en la configuración del store de Redux
export default cartSlice.reducer;

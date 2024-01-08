// Importamos createSlice de @reduxjs/toolkit para crear un slice de estado de manera eficiente
import { createSlice } from '@reduxjs/toolkit';

// Definimos el estado inicial del carrito
// Intentamos recuperar el estado del carrito desde el almacenamiento local; si no existe, usamos un estado inicial predeterminado
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')) // Parseamos el estado del carrito almacenado en localStorage
    : { cartItems: [] }; // Estado inicial por defecto con el carrito vacío

// Función auxiliar para agregar decimales a los precios
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

// Creación del slice del carrito
const cartSlice = createSlice({
    name: 'cart', // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para agregar items al carrito
        addToCart: (state, action) => {
            const item = action.payload; // Obtenemos el item del payload de la acción

            // Buscamos si el item ya existe en el carrito
            const existItem = state.cartItems.find((x) => x._id === item._id);

            // Si el item ya existe, lo reemplazamos con el nuevo; si no, lo agregamos al carrito
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item]; // Agrega el nuevo item al carrito
            }

            // Calculamos los precios y actualizamos el estado
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );

            // Establecemos el precio del envío, gratuito para pedidos mayores a $100
            // Si el pedido es menor, se le suma $10
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // Calculamos el impuesto basado en un porcentaje del precio de los items
            state.taxPrice = addDecimals(
                Number((0.15 * state.itemsPrice).toFixed(2))
            );

            // Calculamos el precio total sumando precio de items, envío e impuestos
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            // Actualizamos el estado del carrito en el almacenamiento local
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

// Exportamos las acciones del slice
export const { addToCart } = cartSlice.actions;

// Exportamos el reducer del slice para ser utilizado en la configuración del store de Redux
export default cartSlice.reducer;

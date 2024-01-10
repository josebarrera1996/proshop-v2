// Importamos createSlice de @reduxjs/toolkit para crear un slice de estado de manera eficiente
import { createSlice } from '@reduxjs/toolkit';
// Importamos la lógica fuerte del carrito en el utils
import { updateCart } from '../utils/cartUtils';

// Definimos el estado inicial del carrito
// Intentamos recuperar el estado del carrito desde el almacenamiento local; si no existe, usamos un estado inicial predeterminado
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')) // Parseamos el estado del carrito almacenado en localStorage
    : { cartItems: [] }; // Estado inicial por defecto con el carrito vacío

// Creación del slice del carrito
const cartSlice = createSlice({
    name: 'cart', // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para agregar items al carrito
        addToCart: (state, action) => {
            const item = action.payload; // Obtenemos el item del payload de la acción

            // Actualizando el estado del cart con la función 'updateCart'
            return updateCart(state, item);
        },
    },
});

// Exportamos las acciones del slice
export const { addToCart } = cartSlice.actions;

// Exportamos el reducer del slice para ser utilizado en la configuración del store de Redux
export default cartSlice.reducer;

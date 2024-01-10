// Función para añadir dos decimales a un número
export const addDecimals = (num) => {
    // Multiplica el número por 100, redondea, y luego divide por 100 para mantener dos decimales
    // Usa toFixed(2) para formatear el resultado como una cadena con dos decimales
    return (Math.round(num * 100) / 100).toFixed(2);
};

// Función para actualizar el estado del carrito
export const updateCart = (state, item) => {
    // Verifica si el item ya está en el carrito
    const existItem = state.cartItems.find((x) => x._id === item._id);

    // Si el item ya existe, reemplaza el item existente con el nuevo item
    // Esto aumentará la cantidad del mismo
    if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
        );
    } else {
        // Si no existe, agrega el nuevo item al final del array de cartItems
        state.cartItems = [...state.cartItems, item];
    }

    // Calcula el precio total de los items en el carrito
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Calcula el precio de envío, gratuito si el precio de los items es mayor a 100
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Calcula el impuesto basado en el precio de los items (15% del precio de los items)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    // Calcula el precio total sumando los precios de los items, el envío y los impuestos
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // Actualiza el estado del carrito en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(state));

    // Retorna el nuevo estado del carrito
    return state;
};

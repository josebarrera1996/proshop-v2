// Función para añadir dos decimales a un número
export const addDecimals = (num) => {
    // Redondea el número a dos decimales y luego lo convierte en una cadena con dos decimales fijos
    return (Math.round(num * 100) / 100).toFixed(2);
};

// Función para actualizar el estado del carrito
export const updateCart = (state) => {
    // Calcula el precio total de los ítems en el carrito
    // Multiplica el precio de cada ítem por su cantidad y suma los resultados
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Calcula el precio de envío
    // Si el precio total de los ítems es mayor a 100, el envío es gratuito, de lo contrario, cuesta 10
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Calcula el impuesto como el 15% del precio total de los ítems
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    // Calcula el precio total, sumando el precio de los ítems, el precio de envío y el impuesto
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // Actualiza el estado del carrito en el almacenamiento local
    // Esto es útil para mantener el estado del carrito incluso si el usuario cierra la página o recarga
    localStorage.setItem('cart', JSON.stringify(state));

    // Retorna el nuevo estado actualizado del carrito
    return state;
};

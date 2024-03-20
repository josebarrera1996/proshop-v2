/**
 * Agrega decimales a un número y lo redondea a dos decimales.
 * @param {number} num - El número al que se le agregarán decimales.
 * @returns {string} El número con dos decimales.
 */
function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}

/**
 * Calcula los precios de un pedido, incluyendo el precio de los productos, el costo de envío, el impuesto y el precio total.
 * @param {Array<Object>} orderItems - Los artículos del pedido.
 * @returns {Object} Un objeto que contiene los precios calculados.
 */
export function calcPrices(orderItems) {
    // Calcular el precio de los artículos
    const itemsPrice = addDecimals(
        orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    // Calcular el costo de envío
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
    // Calcular el impuesto
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    // Calcular el precio total
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);
    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}

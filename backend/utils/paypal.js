// Importar el módulo dotenv para cargar las variables de entorno desde un archivo .env
import dotenv from 'dotenv';
dotenv.config();

// Extraer las variables de entorno necesarias para la integración de PayPal
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_URL } = process.env;

/**
 * Obtiene un token de acceso de la API de PayPal.
 * @see {@link https://developer.paypal.com/reference/get-an-access-token/#link-getanaccesstoken}
 * @returns {Promise<string>} El token de acceso si la solicitud es exitosa.
 * @throws {Error} Si la solicitud no es exitosa.
 */
async function getPayPalAccessToken() {
    // La cabecera de autorización requiere codificación base64
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString(
        'base64'
    );

    // URL para solicitar el token de acceso
    const url = `${PAYPAL_API_URL}/v1/oauth2/token`;

    // Cabeceras de la solicitud
    const headers = {
        Accept: 'application/json',
        'Accept-Language': 'es_AR',
        Authorization: `Basic ${auth}`,
    };

    // Cuerpo de la solicitud
    const body = 'grant_type=client_credentials';

    // Realizar la solicitud a la API de PayPal para obtener el token de acceso
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
    });

    // Si la solicitud no es exitosa, lanzar un error
    if (!response.ok) throw new Error('Failed to get access token');

    // Extraer los datos de PayPal de la respuesta
    const paypalData = await response.json();

    return paypalData.access_token;
}

/**
 * Verifica si una transacción de PayPal es nueva comparando el ID de transacción con los pedidos existentes en la base de datos.
 *
 * @param {Mongoose.Model} orderModel - El modelo Mongoose para los pedidos en la base de datos.
 * @param {string} paypalTransactionId - El ID de transacción de PayPal que se va a verificar.
 * @returns {Promise<boolean>} Devuelve true si es una transacción nueva (es decir, el ID de transacción no existe en la base de datos), false en caso contrario.
 * @throws {Error} Si hay un error al consultar la base de datos.
 */
export async function checkIfNewTransaction(orderModel, paypalTransactionId) {
    try {
        // Buscar todos los documentos donde Order.paymentResult.id es igual al ID pasado paypalTransactionId
        const orders = await orderModel.find({
            'paymentResult.id': paypalTransactionId,
        });

        // Si no hay dichos pedidos, entonces es una transacción nueva
        return orders.length === 0;
    } catch (err) {
        console.error(err);
    }
}

/**
 * Verifica un pago de PayPal haciendo una solicitud a la API de PayPal.
 *
 * @param {string} paypalTransactionId - El ID de transacción de PayPal que se va a verificar.
 * @returns {Promise<Object>} Un objeto con las propiedades 'verified' indicando si el pago está completado y 'value' indicando el monto del pago.
 * @throws {Error} Si la solicitud no es exitosa.
 */
export async function verifyPayPalPayment(paypalTransactionId) {
    // Obtener el token de acceso de PayPal
    const accessToken = await getPayPalAccessToken();

    // Realizar la solicitud a la API de PayPal para verificar el pago
    const paypalResponse = await fetch(
        `${PAYPAL_API_URL}/v2/checkout/orders/${paypalTransactionId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    // Si la solicitud no es exitosa, lanzar un error
    if (!paypalResponse.ok) throw new Error('Failed to verify payment');

    // Extraer los datos de PayPal de la respuesta
    const paypalData = await paypalResponse.json();

    return {
        verified: paypalData.status === 'COMPLETED',
        value: paypalData.purchase_units[0].amount.value,
    };
}

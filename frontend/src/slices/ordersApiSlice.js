// Importamos apiSlice, que ya tiene configurado nuestro estado y lógica de API
import { apiSlice } from './apiSlice';
// Importamos la constante ORDERS_URL desde nuestros valores constantes definidos previamente
import { ORDERS_URL, PAYPAL_URL } from '../constants';

// Extendemos nuestro apiSlice con endpoints adicionales específicos para los pedidos
export const ordersApiSlice = apiSlice.injectEndpoints({
    // Define los endpoints utilizando un builder que proporciona métodos para definir queries y mutations
    endpoints: (builder) => ({
        // Define un punto final 'createOrder' para la creación de un pedido
        createOrder: builder.mutation({
            // Define la consulta (query) para el punto final
            query: (order) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order },
            }),
        }),
        // Define un endpoint 'getOrderDetails' para obtener los detalles de un pedido
        getOrderDetails: builder.query({
            // Define la consulta (query) para el punto final
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        // Define un endpoint 'payOrder' para poder actualizar el pedido a pagado
        payOrder: builder.mutation({
            // Define la consulta (query) para el punto final
            query: ({ orderId, details }) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
            }),
        }),
        // Define un endpoint 'getPayPalClientId' para poder obtener el client id de PayPal
        getPaypalClientId: builder.query({
            query: () => ({
                // Define la consulta (query) para el punto final
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

// Exportando los hooks generados
export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery
} = ordersApiSlice;
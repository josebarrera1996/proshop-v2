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
            // Define la consulta (query) para el punto final
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        // Define un endpoint 'getMyOrders' para poder ver los pedidos del usuario logeado
        getMyOrders: builder.query({
            // Define la consulta (query) para el punto final
            query: () => ({
                url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5,
        }),
        // Define un endpoint 'getOrders' para poder ver todos los pedidos de los usuarios
        getOrders: builder.query({
            // Define la consulta (query) para el punto final
            query: () => ({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        // Define un endpoint 'deliverOrder' para poder actualizar el pedido a entregado
        deliverOrder: builder.mutation({
            // Define la consulta (query) para el punto final
            query: (orderId) => ({
                // Configuración de la solicitud: URL y el método
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

// Exportando los hooks generados
export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation
} = ordersApiSlice;
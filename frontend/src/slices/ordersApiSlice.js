// Importamos apiSlice, que ya tiene configurado nuestro estado y lógica de API
import { apiSlice } from './apiSlice';
// Importamos la constante ORDERS_URL desde nuestros valores constantes definidos previamente
import { ORDERS_URL } from '../constants';

// Extendemos nuestro apiSlice con endpoints adicionales específicos para los pedidos
export const orderApiSlice = apiSlice.injectEndpoints({
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
    }),
});

// Exportando los hooks generados
export const { useCreateOrderMutation } = orderApiSlice;
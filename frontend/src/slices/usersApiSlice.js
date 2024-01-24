import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

// Crea un slice específico para la API de usuario mediante la inyección de puntos finales
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define un punto final 'login' para la autenticación del usuario
        login: builder.mutation({
            // Define la consulta (query) para el punto final
            query: (data) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${USERS_URL}/auth`, // Construye la URL completa para la autenticación
                method: 'POST',
                body: data,
            }),
        }),
        // Define un punto final 'logout' para el deslogeo
        logout: builder.mutation({
            query: () => ({
                // Configuración de la solicitud: URL y método
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

// Extrae las funciones de mutación 'useLoginMutation' y 'useLogoutMutation' del slice de la API de usuario
export const { useLoginMutation, useLogoutMutation } = usersApiSlice;

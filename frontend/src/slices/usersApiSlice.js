import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

// Crea un slice específico para la API de usuario mediante la inyección de puntos finales
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define un 'endpoint' llamado 'login' para la autenticación del usuario
        login: builder.mutation({
            // Define la consulta (query) para el 'endpoint'
            query: (data) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${USERS_URL}/auth`, // Construye la URL completa para la autenticación
                method: 'POST',
                body: data,
            }),
        }),
        // Define un 'endpoint' llamado 'register' para la registración de un nuevo usuario
        register: builder.mutation({
            // Define la consulta (query) para el 'endpoint'
            query: (data) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${USERS_URL}`, // Construye la URL completa para la autenticación
                method: 'POST',
                body: data,
            }),
        }),
        // Define un 'endpoint' llamado 'logout' para el deslogeo
        logout: builder.mutation({
            // Define la consulta (query) para el 'endpoint'
            query: () => ({
                // Configuración de la solicitud: URL y método
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        // Define un 'endpoint' llamado 'profile' para actualizar los datos del usuario logeado
        profile: builder.mutation({
            // Define la consulta (query) para el 'endpoint'
            query: (data) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        // Define un 'endpoint' llamado 'getUsers' para poder obtener todos los usuarios
        getUsers: builder.query({
            // Define la consulta (query) para el 'endpoint'
            query: () => ({
                url: USERS_URL,
            }),
            // Etiquetas proporcionadas para la invalidación del caché
            providesTags: ['Users'],
            // Especifica cuánto tiempo (en minutos) los datos no utilizados se mantendrán en el caché
            keepUnusedDataFor: 5,
        }),
        // Define un 'endpoint' llamado 'getUsers' para poder eliminar un usuario
        deleteUser: builder.mutation({
            // Define la consulta (query) para el 'endpoint'
            query: (userId) => ({
                 // Configuración de la solicitud: URL y el método
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Extrae las funciones de mutación 'useLoginMutation' y 'useLogoutMutation' del slice de la API de usuario
export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = usersApiSlice;
